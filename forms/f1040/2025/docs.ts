// Plain-language documentation for every node in the TY2025 registry, used by
// the forms atlas (`opentax node explore`). Each doc lives next to its node.
// A node added to registry.ts needs a doc.ts and an entry here (docs.test.ts checks).
import type { NodeDoc } from "../nodes/doc.ts";
import { doc as extDoc } from "../nodes/inputs/ext/doc.ts";
import { doc as f1098Doc } from "../nodes/inputs/f1098/doc.ts";
import { doc as f1099bDoc } from "../nodes/inputs/f1099b/doc.ts";
import { doc as f1099cDoc } from "../nodes/inputs/f1099c/doc.ts";
import { doc as f1099divDoc } from "../nodes/inputs/f1099div/doc.ts";
import { doc as f1099gDoc } from "../nodes/inputs/f1099g/doc.ts";
import { doc as f1099intDoc } from "../nodes/inputs/f1099int/doc.ts";
import { doc as f1099kDoc } from "../nodes/inputs/f1099k/doc.ts";
import { doc as f1099oidDoc } from "../nodes/inputs/f1099oid/doc.ts";
import { doc as f1099mDoc } from "../nodes/inputs/f1099m/doc.ts";
import { doc as f1099necDoc } from "../nodes/inputs/f1099nec/doc.ts";
import { doc as f1099rDoc } from "../nodes/inputs/f1099r/doc.ts";
import { doc as f1095aDoc } from "../nodes/inputs/f1095a/doc.ts";
import { doc as f4835Doc } from "../nodes/inputs/f4835/doc.ts";
import { doc as f2441Doc } from "../nodes/inputs/f2441/doc.ts";
import { doc as f8812Doc } from "../nodes/inputs/f8812/doc.ts";
import { doc as f8863Doc } from "../nodes/inputs/f8863/doc.ts";
import { doc as f8949Doc } from "../nodes/inputs/f8949/doc.ts";
import { doc as generalDoc } from "../nodes/inputs/general/doc.ts";
import { doc as k1_trustDoc } from "../nodes/inputs/k1_trust/doc.ts";
import { doc as k1_s_corpDoc } from "../nodes/inputs/k1_s_corp/doc.ts";
import { doc as k1_partnershipDoc } from "../nodes/inputs/k1_partnership/doc.ts";
import { doc as schedule_aDoc } from "../nodes/inputs/schedule_a/doc.ts";
import { doc as schedule_cDoc } from "../nodes/inputs/schedule_c/doc.ts";
import { doc as schedule_eDoc } from "../nodes/inputs/schedule_e/doc.ts";
import { doc as rrb1099rDoc } from "../nodes/inputs/rrb1099r/doc.ts";
import { doc as ssa1099Doc } from "../nodes/inputs/ssa1099/doc.ts";
import { doc as w2Doc } from "../nodes/inputs/w2/doc.ts";
import { doc as w2gDoc } from "../nodes/inputs/w2g/doc.ts";
import { doc as f1099patrDoc } from "../nodes/inputs/f1099patr/doc.ts";
import { doc as f8283Doc } from "../nodes/inputs/f8283/doc.ts";
import { doc as f9465Doc } from "../nodes/inputs/f9465/doc.ts";
import { doc as f8888Doc } from "../nodes/inputs/f8888/doc.ts";
import { doc as schedule_rDoc } from "../nodes/inputs/schedule_r/doc.ts";
import { doc as f2210Doc } from "../nodes/inputs/f2210/doc.ts";
import { doc as f3903Doc } from "../nodes/inputs/f3903/doc.ts";
import { doc as f5695Doc } from "../nodes/inputs/f5695/doc.ts";
import { doc as f8936Doc } from "../nodes/inputs/f8936/doc.ts";
import { doc as f8862Doc } from "../nodes/inputs/f8862/doc.ts";
import { doc as f8958Doc } from "../nodes/inputs/f8958/doc.ts";
import { doc as f8994Doc } from "../nodes/inputs/f8994/doc.ts";
import { doc as f8814Doc } from "../nodes/inputs/f8814/doc.ts";
import { doc as f8379Doc } from "../nodes/inputs/f8379/doc.ts";
import { doc as f8938Doc } from "../nodes/inputs/f8938/doc.ts";
import { doc as f5884Doc } from "../nodes/inputs/f5884/doc.ts";
import { doc as f6478Doc } from "../nodes/inputs/f6478/doc.ts";
import { doc as f6765Doc } from "../nodes/inputs/f6765/doc.ts";
import { doc as f7207Doc } from "../nodes/inputs/f7207/doc.ts";
import { doc as f8881Doc } from "../nodes/inputs/f8881/doc.ts";
import { doc as f8882Doc } from "../nodes/inputs/f8882/doc.ts";
import { doc as f8908Doc } from "../nodes/inputs/f8908/doc.ts";
import { doc as f8941Doc } from "../nodes/inputs/f8941/doc.ts";
import { doc as f8834Doc } from "../nodes/inputs/f8834/doc.ts";
import { doc as f8874Doc } from "../nodes/inputs/f8874/doc.ts";
import { doc as f8911Doc } from "../nodes/inputs/f8911/doc.ts";
import { doc as f8826Doc } from "../nodes/inputs/f8826/doc.ts";
import { doc as f4136Doc } from "../nodes/inputs/f4136/doc.ts";
import { doc as f3468Doc } from "../nodes/inputs/f3468/doc.ts";
import { doc as f4255Doc } from "../nodes/inputs/f4255/doc.ts";
import { doc as f8801Doc } from "../nodes/inputs/f8801/doc.ts";
import { doc as f8332Doc } from "../nodes/inputs/f8332/doc.ts";
import { doc as f8822Doc } from "../nodes/inputs/f8822/doc.ts";
import { doc as f1310Doc } from "../nodes/inputs/f1310/doc.ts";
import { doc as f2439Doc } from "../nodes/inputs/f2439/doc.ts";
import { doc as f8997Doc } from "../nodes/inputs/f8997/doc.ts";
import { doc as schedule_jDoc } from "../nodes/inputs/schedule_j/doc.ts";
import { doc as f8609Doc } from "../nodes/inputs/f8609/doc.ts";
import { doc as f4852Doc } from "../nodes/inputs/f4852/doc.ts";
import { doc as sep_retirementDoc } from "../nodes/inputs/sep_retirement/doc.ts";
import { doc as clergyDoc } from "../nodes/inputs/clergy/doc.ts";
import { doc as f8915fDoc } from "../nodes/inputs/f8915f/doc.ts";
import { doc as f8915dDoc } from "../nodes/inputs/f8915d/doc.ts";
import { doc as f3800Doc } from "../nodes/inputs/f3800/doc.ts";
import { doc as f2106Doc } from "../nodes/inputs/f2106/doc.ts";
import { doc as f5405Doc } from "../nodes/inputs/f5405/doc.ts";
import { doc as nol_carryforwardDoc } from "../nodes/inputs/nol_carryforward/doc.ts";
import { doc as ltc_premiumDoc } from "../nodes/inputs/ltc_premium/doc.ts";
import { doc as sales_tax_deductionDoc } from "../nodes/inputs/sales_tax_deduction/doc.ts";
import { doc as auto_expenseDoc } from "../nodes/inputs/auto_expense/doc.ts";
import { doc as f8917Doc } from "../nodes/inputs/f8917/doc.ts";
import { doc as f8867Doc } from "../nodes/inputs/f8867/doc.ts";
import { doc as f8859Doc } from "../nodes/inputs/f8859/doc.ts";
import { doc as f8820Doc } from "../nodes/inputs/f8820/doc.ts";
import { doc as f8896Doc } from "../nodes/inputs/f8896/doc.ts";
import { doc as f8912Doc } from "../nodes/inputs/f8912/doc.ts";
import { doc as f8978Doc } from "../nodes/inputs/f8978/doc.ts";
import { doc as f8611Doc } from "../nodes/inputs/f8611/doc.ts";
import { doc as f8082Doc } from "../nodes/inputs/f8082/doc.ts";
import { doc as f8873Doc } from "../nodes/inputs/f8873/doc.ts";
import { doc as f8288Doc } from "../nodes/inputs/f8288/doc.ts";
import { doc as f8621Doc } from "../nodes/inputs/f8621/doc.ts";
import { doc as household_wagesDoc } from "../nodes/inputs/household_wages/doc.ts";
import { doc as f8828Doc } from "../nodes/inputs/f8828/doc.ts";
import { doc as f8835Doc } from "../nodes/inputs/f8835/doc.ts";
import { doc as f8844Doc } from "../nodes/inputs/f8844/doc.ts";
import { doc as f8864Doc } from "../nodes/inputs/f8864/doc.ts";
import { doc as f8833Doc } from "../nodes/inputs/f8833/doc.ts";
import { doc as f8840Doc } from "../nodes/inputs/f8840/doc.ts";
import { doc as f8843Doc } from "../nodes/inputs/f8843/doc.ts";
import { doc as f8854Doc } from "../nodes/inputs/f8854/doc.ts";
import { doc as f5471Doc } from "../nodes/inputs/f5471/doc.ts";
import { doc as f8805Doc } from "../nodes/inputs/f8805/doc.ts";
import { doc as fecDoc } from "../nodes/inputs/fec/doc.ts";
import { doc as qsehraDoc } from "../nodes/inputs/qsehra/doc.ts";
import { doc as f965Doc } from "../nodes/inputs/f965/doc.ts";
import { doc as ppp_forgivenessDoc } from "../nodes/inputs/ppp_forgiveness/doc.ts";
import { doc as depletionDoc } from "../nodes/inputs/depletion/doc.ts";
import { doc as lump_sum_ssDoc } from "../nodes/inputs/lump_sum_ss/doc.ts";
import { doc as qbi_aggregationDoc } from "../nodes/inputs/qbi_aggregation/doc.ts";
import { doc as f114Doc } from "../nodes/inputs/f114/doc.ts";
import { doc as f8594Doc } from "../nodes/inputs/f8594/doc.ts";
import { doc as f8903Doc } from "../nodes/inputs/f8903/doc.ts";
import { doc as f14039Doc } from "../nodes/inputs/f14039/doc.ts";
import { doc as f911Doc } from "../nodes/inputs/f911/doc.ts";
import { doc as f843Doc } from "../nodes/inputs/f843/doc.ts";
import { doc as f56Doc } from "../nodes/inputs/f56/doc.ts";
import { doc as f970Doc } from "../nodes/inputs/f970/doc.ts";
import { doc as f3115Doc } from "../nodes/inputs/f3115/doc.ts";
import { doc as f8965Doc } from "../nodes/inputs/f8965/doc.ts";
import { doc as f59eDoc } from "../nodes/inputs/f59e/doc.ts";
import { doc as f1040esDoc } from "../nodes/inputs/f1040es/doc.ts";
import { doc as f4970Doc } from "../nodes/inputs/f4970/doc.ts";
import { doc as f8697Doc } from "../nodes/inputs/f8697/doc.ts";
import { doc as f8866Doc } from "../nodes/inputs/f8866/doc.ts";
import { doc as f1098eDoc } from "../nodes/inputs/f1098e/doc.ts";
import { doc as educator_expensesDoc } from "../nodes/inputs/educator_expenses/doc.ts";
import { doc as preparerDoc } from "../nodes/inputs/preparer/doc.ts";
import { doc as self_employed_health_insuranceDoc } from "../nodes/inputs/self_employed_health_insurance/doc.ts";
import { doc as eitcDoc } from "../nodes/intermediate/forms/eitc/doc.ts";
import { doc as form8962Doc } from "../nodes/intermediate/forms/form8962/doc.ts";
import { doc as form2441Doc } from "../nodes/intermediate/forms/form2441/doc.ts";
import { doc as form2555Doc } from "../nodes/intermediate/forms/form2555/doc.ts";
import { doc as form4137Doc } from "../nodes/intermediate/forms/form4137/doc.ts";
import { doc as form4562Doc } from "../nodes/intermediate/forms/form4562/doc.ts";
import { doc as form461Doc } from "../nodes/intermediate/forms/form461/doc.ts";
import { doc as form4684Doc } from "../nodes/intermediate/forms/form4684/doc.ts";
import { doc as form4952Doc } from "../nodes/intermediate/forms/form4952/doc.ts";
import { doc as form4797Doc } from "../nodes/intermediate/forms/form4797/doc.ts";
import { doc as form8824Doc } from "../nodes/intermediate/forms/form8824/doc.ts";
import { doc as form4972Doc } from "../nodes/intermediate/forms/form4972/doc.ts";
import { doc as form5329Doc } from "../nodes/intermediate/forms/form5329/doc.ts";
import { doc as form5695Doc } from "../nodes/intermediate/forms/form5695/doc.ts";
import { doc as form6198Doc } from "../nodes/intermediate/forms/form6198/doc.ts";
import { doc as form6251Doc } from "../nodes/intermediate/forms/form6251/doc.ts";
import { doc as form6252Doc } from "../nodes/intermediate/forms/form6252/doc.ts";
import { doc as form6781Doc } from "../nodes/intermediate/forms/form6781/doc.ts";
import { doc as form8615Doc } from "../nodes/intermediate/forms/form8615/doc.ts";
import { doc as form8582Doc } from "../nodes/intermediate/forms/form8582/doc.ts";
import { doc as form8582crDoc } from "../nodes/intermediate/forms/form8582cr/doc.ts";
import { doc as form8606Doc } from "../nodes/intermediate/forms/form8606/doc.ts";
import { doc as form8396Doc } from "../nodes/intermediate/forms/form8396/doc.ts";
import { doc as form8815Doc } from "../nodes/intermediate/forms/form8815/doc.ts";
import { doc as form8839Doc } from "../nodes/intermediate/forms/form8839/doc.ts";
import { doc as form8853Doc } from "../nodes/intermediate/forms/form8853/doc.ts";
import { doc as form8880Doc } from "../nodes/intermediate/forms/form8880/doc.ts";
import { doc as form7203Doc } from "../nodes/intermediate/forms/form7203/doc.ts";
import { doc as form7206Doc } from "../nodes/intermediate/forms/form7206/doc.ts";
import { doc as form8889Doc } from "../nodes/intermediate/forms/form8889/doc.ts";
import { doc as form8919Doc } from "../nodes/intermediate/forms/form8919/doc.ts";
import { doc as form8949Doc } from "../nodes/intermediate/forms/form8949/doc.ts";
import { doc as form8959Doc } from "../nodes/intermediate/forms/form8959/doc.ts";
import { doc as form8960Doc } from "../nodes/intermediate/forms/form8960/doc.ts";
import { doc as form8990Doc } from "../nodes/intermediate/forms/form8990/doc.ts";
import { doc as form8995Doc } from "../nodes/intermediate/forms/form8995/doc.ts";
import { doc as form8995aDoc } from "../nodes/intermediate/forms/form8995a/doc.ts";
import { doc as form982Doc } from "../nodes/intermediate/forms/form982/doc.ts";
import { doc as form_1116Doc } from "../nodes/intermediate/forms/form_1116/doc.ts";
import { doc as form_8829Doc } from "../nodes/intermediate/forms/form_8829/doc.ts";
import { doc as ira_deduction_worksheetDoc } from "../nodes/intermediate/worksheets/ira_deduction_worksheet/doc.ts";
import { doc as rate_28_gain_worksheetDoc } from "../nodes/intermediate/worksheets/rate_28_gain_worksheet/doc.ts";
import { doc as schedule2Doc } from "../nodes/intermediate/aggregation/schedule2/doc.ts";
import { doc as schedule3Doc } from "../nodes/intermediate/aggregation/schedule3/doc.ts";
import { doc as schedule_bDoc } from "../nodes/intermediate/aggregation/schedule_b/doc.ts";
import { doc as schedule_dDoc } from "../nodes/intermediate/aggregation/schedule_d/doc.ts";
import { doc as schedule_fDoc } from "../nodes/intermediate/forms/schedule_f/doc.ts";
import { doc as schedule_hDoc } from "../nodes/intermediate/forms/schedule_h/doc.ts";
import { doc as schedule_seDoc } from "../nodes/intermediate/forms/schedule_se/doc.ts";
import { doc as unrecaptured_1250_worksheetDoc } from "../nodes/intermediate/worksheets/unrecaptured_1250_worksheet/doc.ts";
import { doc as agi_aggregatorDoc } from "../nodes/intermediate/aggregation/agi_aggregator/doc.ts";
import { doc as income_tax_calculationDoc } from "../nodes/intermediate/worksheets/income_tax_calculation/doc.ts";
import { doc as qdcgtwDoc } from "../nodes/intermediate/worksheets/qdcgtw/doc.ts";
import { doc as standard_deductionDoc } from "../nodes/intermediate/worksheets/standard_deduction/doc.ts";
import { doc as schedule1aDoc } from "../nodes/intermediate/forms/schedule1a/doc.ts";
import { doc as alimony_receivedDoc } from "../nodes/inputs/alimony_received/doc.ts";
import { doc as f1040Doc } from "../nodes/outputs/f1040/doc.ts";
import { doc as schedule1Doc } from "../nodes/outputs/schedule1/doc.ts";

export const docs: Readonly<Record<string, NodeDoc>> = {
  ext: extDoc,
  f1098: f1098Doc,
  f1099b: f1099bDoc,
  f1099c: f1099cDoc,
  f1099div: f1099divDoc,
  f1099g: f1099gDoc,
  f1099int: f1099intDoc,
  f1099k: f1099kDoc,
  f1099oid: f1099oidDoc,
  f1099m: f1099mDoc,
  f1099nec: f1099necDoc,
  f1099r: f1099rDoc,
  f1095a: f1095aDoc,
  f4835: f4835Doc,
  f2441: f2441Doc,
  f8812: f8812Doc,
  f8863: f8863Doc,
  f8949: f8949Doc,
  general: generalDoc,
  k1_trust: k1_trustDoc,
  k1_s_corp: k1_s_corpDoc,
  k1_partnership: k1_partnershipDoc,
  schedule_a: schedule_aDoc,
  schedule_c: schedule_cDoc,
  schedule_e: schedule_eDoc,
  rrb1099r: rrb1099rDoc,
  ssa1099: ssa1099Doc,
  w2: w2Doc,
  w2g: w2gDoc,
  f1099patr: f1099patrDoc,
  f8283: f8283Doc,
  f9465: f9465Doc,
  f8888: f8888Doc,
  schedule_r: schedule_rDoc,
  f2210: f2210Doc,
  f3903: f3903Doc,
  f5695: f5695Doc,
  f8936: f8936Doc,
  f8862: f8862Doc,
  f8958: f8958Doc,
  f8994: f8994Doc,
  f8814: f8814Doc,
  f8379: f8379Doc,
  f8938: f8938Doc,
  f5884: f5884Doc,
  f6478: f6478Doc,
  f6765: f6765Doc,
  f7207: f7207Doc,
  f8881: f8881Doc,
  f8882: f8882Doc,
  f8908: f8908Doc,
  f8941: f8941Doc,
  f8834: f8834Doc,
  f8874: f8874Doc,
  f8911: f8911Doc,
  f8826: f8826Doc,
  f4136: f4136Doc,
  f3468: f3468Doc,
  f4255: f4255Doc,
  f8801: f8801Doc,
  f8332: f8332Doc,
  f8822: f8822Doc,
  f1310: f1310Doc,
  f2439: f2439Doc,
  f8997: f8997Doc,
  schedule_j: schedule_jDoc,
  f8609: f8609Doc,
  f4852: f4852Doc,
  sep_retirement: sep_retirementDoc,
  clergy: clergyDoc,
  f8915f: f8915fDoc,
  f8915d: f8915dDoc,
  f3800: f3800Doc,
  f2106: f2106Doc,
  f5405: f5405Doc,
  nol_carryforward: nol_carryforwardDoc,
  ltc_premium: ltc_premiumDoc,
  sales_tax_deduction: sales_tax_deductionDoc,
  auto_expense: auto_expenseDoc,
  f8917: f8917Doc,
  f8867: f8867Doc,
  f8859: f8859Doc,
  f8820: f8820Doc,
  f8896: f8896Doc,
  f8912: f8912Doc,
  f8978: f8978Doc,
  f8611: f8611Doc,
  f8082: f8082Doc,
  f8873: f8873Doc,
  f8288: f8288Doc,
  f8621: f8621Doc,
  household_wages: household_wagesDoc,
  f8828: f8828Doc,
  f8835: f8835Doc,
  f8844: f8844Doc,
  f8864: f8864Doc,
  f8833: f8833Doc,
  f8840: f8840Doc,
  f8843: f8843Doc,
  f8854: f8854Doc,
  f5471: f5471Doc,
  f8805: f8805Doc,
  fec: fecDoc,
  qsehra: qsehraDoc,
  f965: f965Doc,
  ppp_forgiveness: ppp_forgivenessDoc,
  depletion: depletionDoc,
  lump_sum_ss: lump_sum_ssDoc,
  qbi_aggregation: qbi_aggregationDoc,
  f114: f114Doc,
  f8594: f8594Doc,
  f8903: f8903Doc,
  f14039: f14039Doc,
  f911: f911Doc,
  f843: f843Doc,
  f56: f56Doc,
  f970: f970Doc,
  f3115: f3115Doc,
  f8965: f8965Doc,
  f59e: f59eDoc,
  f1040es: f1040esDoc,
  f4970: f4970Doc,
  f8697: f8697Doc,
  f8866: f8866Doc,
  f1098e: f1098eDoc,
  educator_expenses: educator_expensesDoc,
  preparer: preparerDoc,
  self_employed_health_insurance: self_employed_health_insuranceDoc,
  eitc: eitcDoc,
  form8962: form8962Doc,
  form2441: form2441Doc,
  form2555: form2555Doc,
  form4137: form4137Doc,
  form4562: form4562Doc,
  form461: form461Doc,
  form4684: form4684Doc,
  form4952: form4952Doc,
  form4797: form4797Doc,
  form8824: form8824Doc,
  form4972: form4972Doc,
  form5329: form5329Doc,
  form5695: form5695Doc,
  form6198: form6198Doc,
  form6251: form6251Doc,
  form6252: form6252Doc,
  form6781: form6781Doc,
  form8615: form8615Doc,
  form8582: form8582Doc,
  form8582cr: form8582crDoc,
  form8606: form8606Doc,
  form8396: form8396Doc,
  form8815: form8815Doc,
  form8839: form8839Doc,
  form8853: form8853Doc,
  form8880: form8880Doc,
  form7203: form7203Doc,
  form7206: form7206Doc,
  form8889: form8889Doc,
  form8919: form8919Doc,
  form8949: form8949Doc,
  form8959: form8959Doc,
  form8960: form8960Doc,
  form8990: form8990Doc,
  form8995: form8995Doc,
  form8995a: form8995aDoc,
  form982: form982Doc,
  form_1116: form_1116Doc,
  form_8829: form_8829Doc,
  ira_deduction_worksheet: ira_deduction_worksheetDoc,
  rate_28_gain_worksheet: rate_28_gain_worksheetDoc,
  schedule2: schedule2Doc,
  schedule3: schedule3Doc,
  schedule_b: schedule_bDoc,
  schedule_d: schedule_dDoc,
  schedule_f: schedule_fDoc,
  schedule_h: schedule_hDoc,
  schedule_se: schedule_seDoc,
  unrecaptured_1250_worksheet: unrecaptured_1250_worksheetDoc,
  agi_aggregator: agi_aggregatorDoc,
  income_tax_calculation: income_tax_calculationDoc,
  qdcgtw: qdcgtwDoc,
  standard_deduction: standard_deductionDoc,
  schedule1a: schedule1aDoc,
  alimony_received: alimony_receivedDoc,
  f1040: f1040Doc,
  schedule1: schedule1Doc,
};
