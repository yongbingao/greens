export const fetchAllCompany = () => {
    return $.ajax({
        method: "GET",
        url: "api/companies"
    })
}

export const fetchCompanyInfo = id => {
    return $.ajax({
        method: "GET",
        url: `api/companies/${id}`
    })
}

export const editCompanyInfo = company => {
    return $.ajax({
        method: "PATCH",
        url: `api/companies/${company.id}`,
        data: {company}
    })
}