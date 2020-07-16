import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import RosterRecord from '@/components/lib/RosterRecord'
import DateUtils from '@/components/lib/DateUtils'

export interface IRosterRecordList {
  list: RosterRecord[]
}

@Module({ dynamic: true, store, name: 'rosterRecordList' })
class RosterRecordList extends VuexModule implements IRosterRecordList {
  public list: RosterRecord[] = []

  @Mutation
  init(targetMonth: Date) {
    this.list = DateUtils.getDaysOfMonth(targetMonth).map(
      t => new RosterRecord(t)
    )
  }

  @Mutation
  updateStartAt(arg: { index: number; value: Date | null }) {
    this.list[arg.index].updateAttendanceTime(arg.value)
  }

  @Mutation
  updateEndAt(arg: { index: number; value: Date | null }) {
    this.list[arg.index].updateLeavingTime(arg.value)
  }
}

export const RosterRecordListModule = getModule(RosterRecordList)
