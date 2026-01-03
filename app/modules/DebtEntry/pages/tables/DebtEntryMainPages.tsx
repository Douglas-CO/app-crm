import { ROUTER_PATHS } from "@/app/routes";
import { DebtEntryTypeEnumChoice } from "@/app/shared";
import {
  FormTabsOnly,
  NestedTabsScene,
  Tab,
} from "@/components";
import { CustomTabPanel } from "@/components/tabs/CustomTabPanel";
import { a11yProps, useTabsOnly } from "@/hooks";
import { SingleTableBoxScene } from "@/shared";
import React from "react";
import DebtEntryStatePages from "./DebtEntryStatePages";

export type DebtEntryMainPagesProps = {};

const returnUrlDebtEntryMainPages =
  ROUTER_PATHS.debt_entry;

const DebtEntryMainPages: React.FC<DebtEntryMainPagesProps> = () => {
  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

  return (
      <SingleTableBoxScene
        title="Deudas"
        showCreateBtn={true}
        createPageUrl={`${returnUrlDebtEntryMainPages.debtentryCrear}`}
        isMainTableStates
      >
        <NestedTabsScene
          tabs={
            <FormTabsOnly value={tabValue} onChange={handleTabChange}>
              <Tab label="Hogar" value={1} {...a11yProps(1)} />
              <Tab label="Casas Comerciales" value={2} {...a11yProps(2)} />
            </FormTabsOnly>
          }
          sxContainer={{
            paddingTop: 0,
            paddingBottom: 0,
            margin: 0,
          }}
        >
          {/* ========================= rubros ========================= */}
          <CustomTabPanel index={1} value={tabValue}>
            <DebtEntryStatePages state={DebtEntryTypeEnumChoice.HOUSE} />
          </CustomTabPanel>

          {/* ========================= transacciones ========================= */}
          <CustomTabPanel index={2} value={tabValue}>
            <DebtEntryStatePages state={DebtEntryTypeEnumChoice.COMMERCIAL_HOUSE} />
          </CustomTabPanel>
        </NestedTabsScene>
      </SingleTableBoxScene>
  );
};

export default DebtEntryMainPages;
