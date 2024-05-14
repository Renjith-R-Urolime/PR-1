import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable({
    providedIn: 'root'
})
export class DateCalculationService {
    daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    constructor(public apiService: ApiService) { }

    checkWeekend(date,shiftData) {
        let isWeekend = false;
        const week = this.getWeek(date);

        const dayOfWeekName = this.daysOfWeek[date.getDay()];

        if(week){
            const res = shiftData?.weekendDetails?.[week-1]?.day?.find(day => day.name === dayOfWeekName.toLowerCase());

            isWeekend = res ? res?.status : false;
        }
        return isWeekend;
    }

    checkHoliday(id) {
        // Call getHolidayList to get holiday details
        this.getHolidayList(id).subscribe(holidayList => {
            // Here you can access the holidayList


            // Now you can perform your logic based on the holidayList
        });
    }

    getShiftDetails(id) {
        if (id) {
            return this.apiService.get(`time-attendance/shift/${id}`);
        }
    }

    getHolidayList(id) {
        if (id) {
            return this.apiService.get(`time-attendance/holiday?workCalendar=${id}`);
        }
    }

    getWeek(calDate){
        const year = calDate.getFullYear();
        // Get the start date of the year
        const startDateOfYear = new Date(year, 0, 1);

        // Calculate the difference in milliseconds
        const diffInMilliseconds = calDate.getTime() - startDateOfYear.getTime();

        // Calculate the number of weeks since the start of the year
        const weekNumber = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24 * 7));

        // Calculate the week number within the 52-week cycle
        let week = weekNumber % 52;
        if (week === 0) {
          week = 52;
        }

        return week;
    }
}
