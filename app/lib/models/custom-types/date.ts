import format from "date-fns/format";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import * as t from "io-ts";

export interface FormattedDateFromNumberC
  extends t.Type<string, number, unknown> {}
export const FormattedDateFromNumber = (stringFormat: string) =>
  new t.Type<string, number, unknown>(
    "FormattedDateFromNumber",
    (u): u is string => typeof u === "string",
    (u, c) =>
      pipe(
        t.number.validate(u, c),
        E.chain((n) => {
          const d = new Date(n);

          return isNaN(d.getTime())
            ? t.failure(u, c)
            : t.success(format(d, stringFormat));
        })
      ),
    (a) => new Date(a).getTime()
  );

export interface TimestampFromStringDateC
  extends t.Type<number, string, unknown> {}
export const TimestampFromStringDate = new t.Type<number, string, unknown>(
  "TimestampFromStringDate",
  (u): u is number => t.number.is(u),
  (u, c) =>
    pipe(
      t.string.validate(u, c),
      E.map((s) => new Date(s).getTime())
    ),
  (a) => new Date(a).toISOString()
);
