import React, { useEffect, useState } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import moment from "moment";

import config from "../config";
import { useFunctions, useFirestore, useAnalytics } from "../firebase";
import useUser from "../stores/user";

function parseRoundTime(startTime, duration) {
  const momentStartTime = moment(startTime);
  const momentEndTime = moment(startTime).add(duration, "m");
  return {
    momentStartTime,
    momentEndTime,
    timeString: `${momentStartTime.format("HH:mm")} - ${momentEndTime.format(
      "HH:mm"
    )}`
  };
}

function RoundList({
  rounds,
  duration,
  preDuration,
  bookingCapacity,
  bookedRoundId,
  userBookedTime,
  bookRoundId,
  bookingsInfo
}) {
  return (
    <ul>
      {rounds.map(round => {
        const { momentStartTime, momentEndTime, timeString } = parseRoundTime(
          round.startTime,
          duration
        );
        const momentPreTime = momentStartTime.subtract(preDuration, "m");

        let hasBookedOther = false;
        userBookedTime.forEach(booked => {
          if (hasBookedOther) {
            return;
          } else if (
            momentPreTime.isBetween(
              booked.momentPreTime,
              booked.momentEndTime,
              null,
              "[)"
            ) ||
            momentEndTime.isBetween(
              booked.momentPreTime,
              booked.momentEndTime,
              null,
              "(]"
            ) ||
            booked.momentPreTime.isBetween(
              momentPreTime,
              momentEndTime,
              null,
              "[)"
            ) ||
            booked.momentEndTime.isBetween(
              momentPreTime,
              momentEndTime,
              null,
              "(]"
            )
          ) {
            hasBookedOther = true;
          }
        });

        const available = bookingsInfo?.[round.id]
          ? bookingCapacity - bookingsInfo[round.id]
          : bookingCapacity;
        let availableText;
        if (config.bookingOpened && !config.bookingClosed) {
          if (available > 10) {
            availableText = "(เหลืออีก > 10)";
          } else if (available > 5) {
            availableText = "(เหลืออีก 5 - 10)";
          } else if (available > 2) {
            availableText = "(เหลืออีก 3 - 5)";
          } else if (available > 0) {
            availableText = "(ใกล้เต็ม)";
          } else {
            availableText = "(เต็ม)";
          }
        }
        const bookedThisRound = bookedRoundId === round.id;
        return (
          <li
            className="mb-2 mx-4"
            key={round.id}
            id={bookedThisRound ? "booked" : undefined}
          >
            <button
              className={
                "px-4 py-2 w-full rounded leading-tight text-left" +
                (bookedThisRound
                  ? " bg-secondary-700 text-white"
                  : hasBookedOther || available <= 0
                  ? " cursor-not-allowed bg-gray-100 text-gray-500"
                  : " bg-gray-100 text-gray-800")
              }
              disabled={bookedRoundId || hasBookedOther || available <= 0}
              onClick={() => bookRoundId(round.id, timeString)}
            >
              {timeString}{" "}
              {!bookedThisRound && hasBookedOther ? (
                <span className="text-sm">(มีกิจกรรมที่จองแล้ว)</span>
              ) : (
                bookingsInfo && availableText
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default function Booking({ event }) {
  const eventsData = useStaticQuery(graphql`
    query {
      allEventsYaml {
        nodes {
          eventId
          roundInfo {
            duration
            preDuration
          }
          rounds {
            id
            startTime
          }
        }
      }
    }
  `).allEventsYaml.nodes;

  const functions = useFunctions();
  const firestore = useFirestore();
  const { amplitude } = useAnalytics();
  const userReady = useUser(state => state.firestoreUser)?.name;
  const userBookings = useUser(state => state.userBookings) || {};
  const userBookedTime = Object.keys(userBookings).map(eventId => {
    const eventData = eventsData.find(
      eventData => eventData.eventId === eventId
    );
    const startTime = eventData.rounds.find(
      roundData => roundData.id === userBookings[eventId]
    ).startTime;
    const duration = eventData.roundInfo.duration;
    const { momentStartTime, momentEndTime } = parseRoundTime(
      startTime,
      duration
    );
    const momentPreTime = momentStartTime.subtract(
      eventData.roundInfo.preDuration,
      "m"
    );
    return {
      momentPreTime,
      momentEndTime
    };
  });
  const bookedRoundId = userBookings?.[event.eventId];

  const roundOn21 = event.rounds.filter(round =>
    round.startTime.startsWith("2020-03-21")
  );
  const roundOn22 = event.rounds.filter(round =>
    round.startTime.startsWith("2020-03-22")
  );

  const [bookingsInfo, setBookingsInfo] = useState();

  useEffect(() => {
    if (firestore) {
      firestore()
        .doc(`eventsInfo/${event.eventId}`)
        .get()
        .then(docSnapshot => {
          if (docSnapshot.exists) {
            setBookingsInfo(docSnapshot.data().bookings);
          } else {
            setBookingsInfo({});
          }
        });
    }
  }, [firestore, event.eventId]);

  const preDurationMessage =
    event.roundInfo.preDuration > 0
      ? `ต้องมาถึงบริเวณกิจกรรม ก่อนรอบเวลาของตนเอง ${event.roundInfo.preDuration} นาที`
      : "ต้องมาถึงบริเวณกิจกรรม ตรงเวลารอบเวลาของตนเอง";

  function bookRoundId(roundId, timeString) {
    if (userReady && config.bookingOpened && !config.bookingClosed) {
      const date = roundId < 200 ? "21" : "22";
      const confirmMessage = `ยืนยันการจองกิจกรรม ${event.roundInfo.name} (${event.eventName})
วันที่ ${date} มีนาคม รอบ ${timeString} น.

เมื่อยืนยันแล้วจะไม่สามารถยกเลิกหรือแก้ไขการจองได้`;
      if (functions && window.confirm(confirmMessage)) {
        functions("asia-east2")
          .httpsCallable("bookRoundId")({ roundId, eventId: event.eventId })
          .then(
            result => {
              if (result.data) {
                window.alert("จองสำเร็จแล้ว");
                amplitude
                  .getInstance()
                  .logEvent("book_event", { eventId: event.eventId, roundId });
              } else {
                window.alert("จองไม่สำเร็จ รอบนี้เต็มแล้ว");
              }
            },
            () => window.alert(`จองไม่สำเร็จ`)
          );
      }
    }
  }

  return (
    <section className="py-4 max-w-screen-md mx-auto" id="booking">
      <h2 className="text-lg font-medium mb-2">
        กิจกรรมย่อย : {event.roundInfo.name}
      </h2>
      <p>รอบละทั้งหมด {event.roundInfo.capacity} คน</p>
      <p className="mb-4">
        เปิดจองล่วงหน้ารอบละทั้งหมด {event.roundInfo.booking} คน
      </p>
      <p className="text-lg text-primary-600">
        <strong className="font-medium">{preDurationMessage}</strong>
      </p>
      <div className="flex flex-wrap my-2 justify-around">
        <article className="w-full md:w-1/2">
          <h3 className="mb-2 font-medium">21 มีนาคม 2563</h3>
          <RoundList
            rounds={roundOn21}
            duration={event.roundInfo.duration}
            preDuration={event.roundInfo.preDuration}
            bookingCapacity={event.roundInfo.booking}
            bookedRoundId={bookedRoundId}
            userBookedTime={userBookedTime}
            bookRoundId={bookRoundId}
            bookingsInfo={bookingsInfo}
          />
        </article>
        <article className="w-full md:w-1/2">
          <h3 className="mb-2 font-medium">22 มีนาคม 2563</h3>
          <RoundList
            rounds={roundOn22}
            duration={event.roundInfo.duration}
            preDuration={event.roundInfo.preDuration}
            bookingCapacity={event.roundInfo.booking}
            bookedRoundId={bookedRoundId}
            userBookedTime={userBookedTime}
            bookRoundId={bookRoundId}
            bookingsInfo={bookingsInfo}
          />
        </article>
      </div>
      {!config.bookingOpened && (
        <div className="text-xl md:text-2xl my-8 text-center text-primary-600 font-medium">
          เปิดจองกิจกรรม วันที่ 26 - 29 กุมภาพันธ์ 2563
        </div>
      )}
      {config.bookingOpened &&
        !config.bookingClosed &&
        (userReady ? (
          <div className="text-xl md:text-2xl my-8 text-center text-primary-600 font-medium">
            {bookedRoundId
              ? "ท่านได้จองกิจกรรมนี้แล้ว และ ไม่สามารถแก้ไขการจองได้"
              : "กรุณาเลือกรอบที่ต้องการจอง"}
          </div>
        ) : (
          <Link
            to="/login"
            className="block text-xl md:text-2xl my-8 mx-auto p-4 rounded text-center bg-primary-700 text-white font-medium"
          >
            ลงทะเบียนเพื่อจองกิจกรรม
          </Link>
        ))}
      {config.bookingClosed && (
        <div className="text-xl md:text-2xl my-8 text-center text-primary-600 font-medium">
          การจองกิจกรรมย่อยล่วงหน้าสิ้นสุดลงแล้ว
          <br />
          ทุกท่านยังคงสามารถเข้าร่วมกิจกรรมนี้ ได้โดยไม่ต้องจองล่วงหน้า
        </div>
      )}
    </section>
  );
}
