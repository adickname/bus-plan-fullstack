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
  let minDistance = 0;
  let distance;
  let dataPrice;
  let dateOfExpiry;
  let reducedPrice;

  if (typeTicket === "day") {
    dateOfIssue = `${dateOfIssue.getFullYear()}-${(dateOfIssue.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateOfIssue.getDate()}`;
    dateOfExpiry = dateOfIssue;
  }
  if (typeTicket === "month") {
    const data = new Date(dateOfIssue);
    console.log(data);
    dateOfIssue = `${data.getFullYear()}-${(data.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${data.getDate().toString().padStart(2, "0")}`;
    dateOfExpiry = new Date(data.getFullYear(), data.getMonth() + 1, 0);
    dateOfExpiry = `${dateOfExpiry.getFullYear()}-${(
      dateOfExpiry.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${dateOfExpiry.getDate().toString().padStart(2, "0")}`;
  }
  console.log(dateOfIssue, dateOfExpiry);

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
      if (age < 18) {
        reducedPrice =
          ((minDistance * multiplierTypeTicket) / 100) * 49 * multiplierOneWay;
      } else {
        reducedPrice = 0;
      }

      try {
        const res = await fetch("http://localhost:5170/api/orders/new", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            owner: sessionStorage.getItem("id"),
            name: name,
            surname: surname,
            age: age,
            company: company,
            distance: minDistance,
            end: end,
            start: start,
            fakePrice: (
              minDistance *
              multiplierTypeTicket *
              multiplierOneWay
            ).toFixed(),
            reducedPrice: reducedPrice.toFixed(),
            dateOfIssue: dateOfIssue,
            dateOfExpiry: `${dateOfExpiry}`,
            typeTicket: typeTicket,
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
