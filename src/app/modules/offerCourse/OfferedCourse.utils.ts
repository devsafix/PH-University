
import { Days } from "./offerCourse.interface"

export type TSchedule={
    days:Days[],
    startTime:string,
    endTime:string
}

export const hasTimeConflict=(assignedSchedules:TSchedule[],newSchedules:TSchedule)=>{
  for (const schedules of assignedSchedules) {
      const existingStartTime = new Date(`1970-01-01T${schedules.startTime}`)
      const existingEndTime = new Date(`1970-01-01T${schedules.endTime}`)
      const newStartTime = new Date(`1970-01-01T${newSchedules.startTime}`)
      const newEndTime = new Date(`1970-01-01T${newSchedules.endTime}`)


      if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
          return true

      }
    
  }
  return false
}