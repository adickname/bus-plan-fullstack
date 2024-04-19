export async function findCompanies(end, start) {
  companies.value = [];
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER}/api/schedules/bus-stops`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ end: end, start: start }),
      }
    );
    const data = await res.json();
    data.forEach((element) => {
      let isFree = true;
      companies.value.forEach((elementCompanies) => {
        if (elementCompanies === element.company) {
          isFree = false;
        }
      });
      if (isFree) {
        companies.value.push(element.company);
      }
    });
    sessionStorage.setItem("ticket-data", JSON.stringify(data));
  } catch (error) {
    console.log(error.message);
  }
}
