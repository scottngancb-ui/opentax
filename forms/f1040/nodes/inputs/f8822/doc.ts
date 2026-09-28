import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8822",
  subtitle: "Change of Address",
  topic: Topic.Administrative,
  summary:
    "The form you send the IRS to update your home mailing address so notices and refunds reach you. " +
    "It is filed separately from the return and has no effect on your tax; the engine only records it. " +
    "Businesses use a different form (8822-B) to change a business address.",
  fields: {
    taxpayer_name: "Your name as it appears on your return.",
    ssn: "Your Social Security number.",
    old_address: "Your previous address, so the IRS can match its records.",
    new_address: "Your new street address, including apartment or suite number.",
    new_city: "City of your new address.",
    new_state: "State of your new address.",
    new_zip: "ZIP code of your new address.",
    new_country: "Country of your new address, if outside the United States.",
    spouse_name: "Your spouse's name, if the change also applies to them.",
    spouse_ssn: "Your spouse's Social Security number.",
  },
};
