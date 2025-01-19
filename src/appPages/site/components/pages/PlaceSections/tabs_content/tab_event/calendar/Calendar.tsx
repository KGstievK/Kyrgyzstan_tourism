import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import scss from './Calendar.module.scss';
import useTranslate from '@/appPages/site/hooks/translate/translate';

interface CalendarProps {
  initialDate?: Date;
  onDateSelect?: (date: Date) => void;
  className?: string;
}

interface DayInfo {
  date: number | null;
  isToday: boolean;
  isSelected: boolean;
}

type Week = (number | null)[];

const Calendar: React.FC<CalendarProps> = ({
  initialDate = new Date(),
  onDateSelect,
  className = '',
}) => {
  const [date, setDate] = useState(initialDate);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { t } = useTranslate();

  const months: string[] = [
    t("Январь", "يناير", "January"),
    t("Февраль", "فبراير", "February"),
    t("Март", "مارس", "March"),
    t("Апрель", "أبريل", "April"),
    t("Май", "مايو", "May"),
    t("Июнь", "يونيو", "June"),
    t("Июль", "يوليو", "July"),
    t("Август", "أغسطس", "August"),
    t("Сентябрь", "سبتمبر", "September"),
    t("Октябрь", "أكتوبر", "October"),
    t("Ноябрь", "نوفمبر", "November"),
    t("Декабрь", "ديسمبر", "December")
  ];

  const weekDays: string[] = [
    t("Пн", "الاثنين", "Mon"),
    t("Вт", "الثلاثاء", "Tue"),
    t("Ср", "الأربعاء", "Wed"),
    t("Чт", "الخميس", "Thu"),
    t("Пт", "الجمعة", "Fri"),
    t("Сб", "السبت", "Sat"),
    t("Вс", "الأحد", "Sun")
  ];

  const getDaysInMonth = (date: Date): Week[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();
    
    const days: Week[] = [];
    let currentDate = 1;
    let firstDayOfWeek = firstDay.getDay() || 7;
    firstDayOfWeek--; // Корректировка для начала недели с понедельника
    
    while (currentDate <= totalDays) {
      const week: Week = [];
      for (let i = 0; i < 7; i++) {
        if ((currentDate === 1 && i < firstDayOfWeek) || currentDate > totalDays) {
          week.push(null);
        } else {
          week.push(currentDate);
          currentDate++;
        }
      }
      days.push(week);
    }
    
    return days;
  };

  const prevMonth = (): void => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };

  const nextMonth = (): void => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  const selectMonth = (monthIndex: number): void => {
    setDate(new Date(date.getFullYear(), monthIndex));
    setIsMonthDropdownOpen(false);
  };

  const isToday = (day: number | null): boolean => {
    if (!day) return false;
    const today = new Date();
    return day === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const handleDateClick = (day: number | null): void => {
    if (!day) return;
    const newDate = new Date(date.getFullYear(), date.getMonth(), day);
    setSelectedDate(newDate);
    onDateSelect?.(newDate);
  };

  return (
    <div className={scss.calendar}>
      <div className={scss.header}>
        <div className={scss.relative}>
          <button
            onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
            aria-haspopup="true"
            aria-expanded={isMonthDropdownOpen}
          >
            {months[date.getMonth()]}
          </button>
          
          {isMonthDropdownOpen && (
            <div 
              className={scss.dropdown}
              role="listbox"
            >
              {months.map((month, index) => (
                <button
                  key={month}
                  onClick={() => selectMonth(index)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  role="option"
                  aria-selected={date.getMonth() === index}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>

        <button 
          onClick={nextMonth}
          aria-label={t("Следующий месяц", "الشهر التالي", "Next month")}
          className={scss.arrow}
        >
          <ChevronRight/>
        </button>
      </div>

      <div className={scss.body}>
        {getDaysInMonth(date).map((week, weekIndex) => (
          <div 
            key={weekIndex}
            className={scss.week}
          >
            {weekDays.map((day, dayIndex) => (
              <div 
                key={`${weekIndex}-${dayIndex}-day`}
                className={scss.day}
              >
                <div className={scss.dayName} >
                  {day}
                </div>
                <div
                  onClick={() => handleDateClick(week[dayIndex])}
                  className={`
                    ${week[dayIndex] ? 'hover:bg-gray-100 cursor-pointer' : ''}
                    ${isToday(week[dayIndex]) ? 'bg-blue-100' : ''}
                    ${selectedDate && week[dayIndex] === selectedDate.getDate() &&
                      date.getMonth() === selectedDate.getMonth() &&
                      date.getFullYear() === selectedDate.getFullYear()
                      ? 'bg-blue-200'
                      : ''}
                  `}
                  style={{ color: dayIndex > 4 ? 'red' : 'black' }}
                  role="button"
                  tabIndex={week[dayIndex] ? 0 : -1}
                  aria-label={week[dayIndex] ? `${week[dayIndex]} ${months[date.getMonth()]}` : undefined}
                >
                  {week[dayIndex]}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;