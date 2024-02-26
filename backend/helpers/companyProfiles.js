module.exports = {
  getCompanyProfilesByParams(filters, companyProfiles) {
    let newCompanyProfiles = [...companyProfiles];

    const filtersKey = filters.map((filter) => filter[0]);
    const isTherePagination = filtersKey.some(
      (key) =>
        key === "startAtRecord" || key === "recordsPerPage" || key === "sortBy"
    );

    filters.map((filter) => {
      if (
        filter[0] !== "startAtRecord" &&
        filter[0] !== "sortBy" &&
        filter[0] !== "recordsPerPage" &&
        filter[1] !== ""
      ) {
      }
    });

    if (isTherePagination) {
      filters.forEach((filter) => {
        if (filter[0] === "startAtRecord") {
          newCompanyProfiles = newCompanyProfiles.slice(filter[1]);
        } else if (filter[0] === "recordsPerPage") {
          newCompanyProfiles = newCompanyProfiles.slice(0, filter[1]);
        } else if (filter[0] === "sortBy") {
          newCompanyProfiles = newCompanyProfiles.sort((a, b) => {
            if (a[filter[1]] < b[filter[1]]) {
              return -1;
            }
            if (a[filter[1]] > b[filter[1]]) {
              return 1;
            }
            return 0;
          });
        }
      });
    } else {
      companyProfiles.forEach((companyProfile) => {
        let filterAmount = 0;
        filters.forEach((filter) => {
          if (companyProfile[filter[0]] === filter[1] || filter[1] === "") {
            filterAmount++;
          }
        });
        if (filterAmount === filters.length) {
          newCompanyProfiles.push(companyProfile);
        }
      });
    }

    return newCompanyProfiles;
  },
};
