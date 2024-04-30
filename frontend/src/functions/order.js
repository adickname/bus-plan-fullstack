export const order = async (
  company,
  oneWay,
  typeTicket,
  age,
  name,
  end,
  start,
  surname,
  dateOfIssue,
  sub
) => {
  let minDistance = 0;
  let distance;
  let dataPrice;
  let dateOfExpiry;
  let reducedPrice;
  console.log(
    company,
    oneWay,
    typeTicket,
    age,
    name,
    end,
    start,
    surname,
    dateOfIssue,
    sub
  );
  if (typeTicket === "day") {
    dateOfIssue = `${dateOfIssue.getFullYear()}-${(dateOfIssue.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateOfIssue.getDate()}`;
    dateOfExpiry = dateOfIssue;
  }
  if (typeTicket === "month") {
    const data = new Date(dateOfIssue);
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

  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_SERVER_URL
      }/api/orders/prices?company=${company}`
    );
    dataPrice = await res.json();
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
      console.log(99);
      if (age < 18) {
        reducedPrice =
          ((minDistance * multiplierTypeTicket) / 100) * 49 * multiplierOneWay;
      } else {
        reducedPrice = 0;
      }

      try {
        console.log(88);
        await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/orders/new`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            owner: sub,
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
            oneWay: oneWay,
          }),
        });
        const dataRes = await res.json();
        if (dataRes.message) {
          return "added succesfully";
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
