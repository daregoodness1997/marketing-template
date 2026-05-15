import type messages from "../messages/cs.json";

export type Messages = typeof messages;

declare module "next-intl" {
  interface IntlMessages extends Messages {}
}
