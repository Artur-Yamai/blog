import { useState, useEffect } from "react";
import "./TextArea.scss";

interface ITextArea {
  text: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  cols?: number;
  rows?: number;
  onChange: (value: string) => void;
}

export function TextArea({
  text,
  label,
  onChange,
  placeholder = "",
  required = true,
  cols = 30,
  rows = 10,
}: ITextArea): JSX.Element {
  const [value, changeValue] = useState<string>(text);

  function change(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newValue: string = e.target.value;
    changeValue(newValue);
    onChange(newValue);
  }

  useEffect(() => {
    changeValue(text);
  }, [text]);

  return (
    <div className="textarea">
      <textarea
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={change}
        name="textarea"
        cols={cols}
        rows={rows}
      />
      <label className="textarea__label">{label}</label>
    </div>
  );
}
