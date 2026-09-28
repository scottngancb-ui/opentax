import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8332",
  subtitle: "Release/Revocation of Release of Claim to Exemption for Child by Custodial Parent",
  topic: Topic.Household,
  summary:
    "The form a custodial parent signs to let the noncustodial parent claim a child as a dependent, for one year, several years or all future years, or to revoke an earlier release. " +
    "The noncustodial parent attaches it to their return to support claiming the child. " +
    "In the engine it is a record only: it does not by itself add a dependent or change any Form 1040 line.",
  fields: {
    custodial_parent_name: "Name of the custodial parent, the one the child lived with for more nights during the year, who is releasing the claim.",
    custodial_parent_ssn: "The custodial parent's SSN.",
    noncustodial_parent_name: "Name of the noncustodial parent who will claim the child.",
    noncustodial_parent_ssn: "The noncustodial parent's SSN.",
    children: "The child or children the release covers.",
    "children.name": "The child's name.",
    "children.ssn": "The child's SSN.",
    tax_years_released: "The tax years the release covers: either a list of specific years or all future years.",
    is_revocation: "Mark if this form revokes a release you gave before (Part III) rather than granting one.",
  },
};
