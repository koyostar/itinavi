import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface DatePickerFieldProps {
  label: string;
  value: Date | null;
  onChange: (val: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
}

export default function DatePickerField({
  label,
  value,
  onChange,
  minDate,
  maxDate,
}: DatePickerFieldProps) {
  return (
    <DatePicker
      label={label}
      value={value ? dayjs(value) : null}
      onChange={(newVal: Dayjs | null) => {
        onChange(newVal ? newVal.toDate() : null);
      }}
      minDate={minDate ? dayjs(minDate) : undefined}
      maxDate={maxDate ? dayjs(maxDate) : undefined}
      slotProps={{
        textField: {
          required: true,
          fullWidth: true,
        },
      }}
    />
  );
}
