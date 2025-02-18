//TOO BIG FILE
import { useOrderStore } from "@/store/orderStore.js";
import { useFindBusStore } from "@/store/findBusStore";
import { useMessageStore } from "@/store/messageStore";
const findBusStore = useFindBusStore();
const { getStart, getDestination } = findBusStore;
const orderStore = useOrderStore();
let {
  getName,
  getSurname,
  getAge,
  getOneWay,
  getDateOfIssue,
  getCompany,
  getTypeTicket,
} = orderStore;
const messageStore = useMessageStore();
const { changeMessage, changeSeverity, changeShouldBeDisplayed } = messageStore;
export const order = async (sub) => {
  let minDistance = 0;
  let distance;
  let dataPrice;
  let dateOfExpiry;
  let reducedPrice;
  let dateIssue = getDateOfIssue.value;
  if (getTypeTicket === "day") {
    dateIssue = `${dateIssue.getFullYear()}-${(dateIssue.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${getDateOfIssue.value.getDate()}`;
    dateOfExpiry = getDateOfIssue.value;
  }
  if (getTypeTicket.value === "month") {
    const data = new Date(dateIssue);
    dateIssue = `${data.getFullYear()}-${(data.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${data.getDate().toString().padStart(2, "0")}`;
    dateOfExpiry = new Date(data.getFullYear(), data.getMonth() + 1, 0);
    dateOfExpiry = `${dateOfExpiry.getFullYear()}-${(
      dateOfExpiry.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${dateOfExpiry.getDate().toString().padStart(2, "0")}`;
  }

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_SERVER_URL}/api/orders/prices?company=${
        getCompany.value
      }`
    );
    dataPrice = await res.json();
    let multiplierTypeTicket;
    let multipliergetOneWay;
    if (getOneWay.value) {
      if (getOneWay.value === true) {
        multipliergetOneWay = 1;
      } else {
        multipliergetOneWay = 2;
      }
    }
    if (getTypeTicket.value) {
      switch (getTypeTicket.value) {
        case "day":
          multiplierTypeTicket = await dataPrice.price;
          break;
        case "week":
          multiplierTypeTicket = await dataPrice.priceWeek;
          break;
        case "month":
          multiplierTypeTicket = await dataPrice.priceMonth;
          break;
      }
    }
    if (getAge.value < 18) {
      multiplierTypeTicket /= 100;
      multiplierTypeTicket *= 51;
    }
    const dataWithCompanyFilter = [];
    dataWithCompanyFilter.forEach((element) => {
      element.places
        .slice()
        .reverse()
        .forEach((elementOfLine) => {
          if (elementOfLine.place === end) {
            distance = elementOfLine.distance;
          }
          if (elementOfLine.place === start) {
            distance -= elementOfLine.distance;
          }
        });
      if (minDistance) {
        if (minDistance >= distance) {
          minDistance = distance;
        }
      } else {
        minDistance = distance;
      }
    });
    try {
      if (getAge.value < 18) {
        reducedPrice =
          ((minDistance * multiplierTypeTicket) / 100) *
          49 *
          multipliergetOneWay;
      } else {
        reducedPrice = 0;
      }
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_SERVER_URL}/api/orders/new`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              owner: sub,
              name: getName.value,
              surname: getSurname.value,
              age: getAge.value,
              company: getCompany.value,
              distance: minDistance,
              end: getDestination.value,
              start: getStart.value,
              fakePrice: (
                minDistance *
                multiplierTypeTicket *
                multipliergetOneWay
              ).toFixed(),
              reducedPrice: reducedPrice.toFixed(),
              dateOfIssue: dateIssue,
              dateOfExpiry: `${dateOfExpiry}`,
              typeTicket: getTypeTicket.value,
              oneWay: getOneWay.value,
            }),
          }
        );
        const dataRes = await res.json();
        if (dataRes.message) {
          changeMessage("added succesfully");
          changeSeverity("info");
          changeShouldBeDisplayed(true);
        }
      } catch (error) {
        return error.message;
      }
    } catch (error) {
      return error.message;
    }
  } catch (error) {
    return error.message;
  }
};
