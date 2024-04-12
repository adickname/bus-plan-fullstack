export async function order(
  company,
  oneWay,
  typeTicket,
  age,
  name,
  end,
  start,
  surname,
  dateOfIssue
) {
  let minDistance = null;
  let distance;
  let dataPrice;
  let dateOfExpiry;

  if (typeTicket === "day") {
    dateOfExpiry = dateOfIssue;
  }
  if (typeTicket === "month") {
    const data = new Date(dateOfIssue);
    console.log(data);
    dateOfExpiry = new Date(dateOfIssue);
  }
  try {
    const res = await fetch(
      `http://localhost:5170/api/orders/prices?company=${company}`
    );
    dataPrice = await res.json();
    console.log(await dataPrice);
    let multiplierTypeTicket;
    let multiplierOneWay;
    if (oneWay) {
      if (oneWay === true) {
        multiplierOneWay = 1;
      } else {
        multiplierOneWay = 2;
      }
    }
    if (typeTicket) {
      switch (typeTicket) {
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
    if (age < 18) {
      multiplierTypeTicket /= 100;
      multiplierTypeTicket *= 51;
    }
    const ticketData = JSON.parse(sessionStorage.getItem("ticket-data"));
    const dataWithCompanyFilter = [];
    ticketData.forEach((element) => {
      if (element.company === company) {
        dataWithCompanyFilter.push(element);
      }
    });
    dataWithCompanyFilter.forEach((element) => {
      element.places
        .slice()
        .reverse()
        .forEach((elementOfLine) => {
          if (elementOfLine.place === end) {
            distance = elementOfLine.distance;
            console.log(elementOfLine.place, elementOfLine.distance);
          }
          if (elementOfLine.place === start) {
            console.log(elementOfLine.place, elementOfLine.distance);
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
      try {
        const res = await fetch("http://localhost:5170/api/orders/new", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            owner: sessionStorage.getItem("email"),
            name: name,
            surname: surname,
            age: age,
            company: company,
            distance: minDistance,
            end: end,
            start: start,
            fakePrice:
              minDistance * multiplierTypeTicket * multiplierOneWay.toFixed(),
            reducedPrice: (
              ((minDistance * multiplierTypeTicket) / 100) *
              49 *
              multiplierOneWay
            ).toFixed(),
            company: company,
          }),
        });
        const dataRes = await res.json();
        console.log(await dataRes.message);
      } catch (error) {
        console.log(error.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  } catch (error) {
    console.log(error.message);
  }
}
