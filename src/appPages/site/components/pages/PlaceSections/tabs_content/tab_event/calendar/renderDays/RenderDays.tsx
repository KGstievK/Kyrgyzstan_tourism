import scss from './RenderDays.module.scss'
interface RenderDaysProps {
    weekDays: string[];
    getWeekDay: (year: number, month: number, day: number) => number;
    getDaysInMonth: (year: number, month: number) => number;
    date: Date;
    setIsDate: (date: string) => void
}

const RenderDays: React.FC<RenderDaysProps> = ({weekDays, getWeekDay, getDaysInMonth, date, setIsDate}) => {
  const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth());
  const days: React.ReactNode[] = [];

  for (let i = 1; i <= daysInMonth; i++) {
    const weekDay =
      weekDays[getWeekDay(date.getFullYear(), date.getMonth(), i)];
    days.push(
      <div key={i} className={scss.day}>
        <div className={scss.weekday}>{weekDay}</div>
        <div
          onClick={() => {
            const selectedDate = new Date(date.getFullYear(), date.getMonth(), i + 1);
            const formattedDate = selectedDate.toISOString().split('T')[0];
            setIsDate(formattedDate);
          }}
          className={scss.date}
        >
          {i}
        </div>
      </div>
    );
  }

  return <div className={scss.days}>{days}</div>;
};


export default RenderDays