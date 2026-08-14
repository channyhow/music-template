import siteData from "@/data/site.json";
import type { FormSchema, TallyFormKey } from "@/types/forms";

import { TallyFormEmbed } from "./TallyFormEmbed";

const TALLY_FORM_IDS: Record<TallyFormKey, string | undefined> = {
  contact: import.meta.env.VITE_TALLY_CONTACT_FORM_ID,
  reservation: import.meta.env.VITE_TALLY_RESERVATION_FORM_ID,
};

const resolveTallyFormId = (schema: FormSchema) => schema.formId ?? (schema.tallyKey ? TALLY_FORM_IDS[schema.tallyKey] : undefined);

export function Form({ schema }: { schema: FormSchema }) {
  const formCopy = siteData.ui.copy.forms;
  const tallyFormId = resolveTallyFormId(schema);

  if (schema.provider === "tally" && (tallyFormId || schema.embedUrl)) {
    return <div className="form form--tally"><TallyFormEmbed formId={tallyFormId} embedUrl={schema.embedUrl} title={schema.title ?? "Formulaire"} fallbackHeight={schema.fallbackHeight} /></div>;
  }

  return (
    <form className="form" name={schema.name} method="POST" data-netlify="true">
      <input type="hidden" name="form-name" value={schema.name} />
      <div className="form__body">
        {schema.fields.map((field) => (
          <label className="form__field" key={field.name}>
            <span className="form__label">{field.label}</span>
            {field.type === "textarea" ? <textarea className="form__control" name={field.name} required={field.required} placeholder={field.placeholder} rows={6} /> : field.type === "select" ? (
              <select className="form__control" name={field.name} required={field.required} defaultValue=""><option value="" disabled>{formCopy.selectPlaceholder}</option>{field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
            ) : field.type === "checkbox" ? <input className="form__control" name={field.name} type="checkbox" required={field.required} /> : <input className="form__control" name={field.name} type={field.type} required={field.required} placeholder={field.placeholder} min={field.min} max={field.max} step={field.step} />}
          </label>
        ))}
      </div>
      <footer className="form__footer"><button className="form__submit" type="submit">{schema.submitLabel ?? formCopy.defaultSubmitLabel}</button></footer>
    </form>
  );
}
