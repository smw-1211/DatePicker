import { useDatePicker } from "@rehookify/datepicker";
import { useState } from "react";
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { 
  Button, 
  Calendar,
  Section, 
  SectionHeader, 
} from './components';
import {
  getDayClassName,
  getMonthClassName,
  getYearsClassName,
} from './classnames-utils';

function App() {
  const [selectedDates, onDatesChange] = useState<Date[]>([]);
  const {
    data: { calendars, weekDays, formattedDates, months, years },
    propGetters: {
      dayButton,
      addOffset,
      subtractOffset,
      monthButton,
      nextYearsButton,
      previousYearsButton,
      yearButton,
    }
  } = useDatePicker({
    selectedDates,
    onDatesChange,
    calendar: {
      startDay: 1,
    },
  });
  
  const { month, year, days } = calendars[0];

  return (
    <div className="block p-4 border border-slate-300 rounded shadow-xs shadow shadow-slate-300">
      <h1 className="text-2xl w-full text-center mb-6">{formattedDates[0]}</h1>
      <main className="grid grid-cols-3 gap-x-6">
        <Section>
          <SectionHeader>
            <Button className="w-8" {...subtractOffset({ months: 1 })}>
              <IoChevronBack />
            </Button>
            <p className="text-center text-sm">{month}</p>
            <Button className="w-8" {...addOffset({ months: 1 })}>
              <IoChevronForward />
            </Button>
          </SectionHeader>
          <Calendar className="mb-2 items-center h-8">
            {weekDays.map((d) => (
              <p className="text-xs text-center">{d}</p>
            ))}
          </Calendar>
          <Calendar>
            {days.map((d) => (
              <Button 
                key={d.$date.toString()} 
                className={getDayClassName("w-8 text-xs", d)}
                {...dayButton(d)}
              >
                {d.day}
              </Button>
            ))}
          </Calendar>   
          <Button>Clear Selection</Button>       
        </Section>
        <Section>
          <SectionHeader>
            <Button className="w-8" {...subtractOffset({ months: 1 })}>
              <IoChevronBack />
            </Button>
            <p className="text-center text-sm">{year}</p>
            <Button className="w-8" {...addOffset({ months: 1 })}>
              <IoChevronForward />
            </Button>
          </SectionHeader>
          <main className="grid grid-cols-3 items-center gap-x-2 gap-y-2">
            {months.map((m) => (
              <Button
                key={m.month + year}
                className={getMonthClassName("text-xs", m)}
                {...monthButton(m)}
              >
                {m.month}
              </Button>
            ))}
          </main>
        </Section>
        <Section>
          <SectionHeader>
            <Button className="w-8" {...previousYearsButton()}>
              <IoChevronBack />
            </Button>
            <p className="text-center text-sm">
              {`${years[0].year} - ${years[years.length - 1].year}`}
            </p>
            <Button className="w-8" {...nextYearsButton()}>
              <IoChevronForward />
            </Button>
          </SectionHeader>
          <main className="grid grid-cols-3 items-center gap-x-2 gap-y-2">
            {years.map((y) => (
              <Button 
                key={y.$date.toString()} 
                className={getYearsClassName("text-xs", y)}
                {...yearButton(y)}
              >
                {y.year}
              </Button>
            ))}
          </main>
        </Section>
      </main>
    </div>
  );
}

export default App;
