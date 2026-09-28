import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 4136",
  subtitle: "Credit for Federal Tax Paid on Fuels",
  topic: Topic.BusinessCredits,
  summary:
    "The form that gives back the federal excise tax you paid on fuel used for nontaxable purposes, such as in farming, off-highway business equipment or noncommercial aviation. " +
    "You enter gallons by fuel type and use; the engine multiplies them by built-in per-gallon rates. " +
    "It sends the farming-use credit to Form 1040 as a refundable credit and the other uses to the general business credit on Schedule 3.",
  fields: {
    gasoline_offhighway_gallons: "Gallons of gasoline used in off-highway business equipment, such as generators or construction machinery.",
    gasoline_farming_gallons: "Gallons of gasoline used on a farm for farming purposes.",
    diesel_offhighway_gallons: "Gallons of undyed diesel fuel used in off-highway business equipment.",
    diesel_farming_gallons: "Gallons of undyed diesel fuel used on a farm for farming purposes.",
    aviation_gas_noncommercial_gallons: "Gallons of aviation gasoline used in noncommercial aviation for a nontaxable purpose.",
    aviation_gas_farming_gallons: "Gallons of aviation gasoline used for farming, such as crop dusting.",
    kerosene_offhighway_gallons: "Gallons of undyed kerosene used in off-highway business equipment.",
    kerosene_farming_gallons: "Gallons of undyed kerosene used on a farm for farming purposes.",
    kerosene_aviation_gallons: "Gallons of kerosene used in noncommercial aviation.",
    lpg_offhighway_gallons: "Gallons of liquefied petroleum gas (propane) used in off-highway business equipment.",
    cng_offhighway_gallons: "Gasoline-gallon equivalents of compressed natural gas used in off-highway business equipment.",
  },
};
