const module_debt_entry = 'modules/debt_entry'

export const ROUTER_PATHS = {
    home: '/',
    notFound: '/404',

    /////* Debt Entry ----------------
    debt_entry: {
        debtentry: `${module_debt_entry}/DebtEntryPage.tabs`,
        debtentryCrear: `${module_debt_entry}/DebtEntryCrearPage.tabs`,
        debtentryEditar: `${module_debt_entry}/DebtEntryEditarPage.tabs`,
    }
}