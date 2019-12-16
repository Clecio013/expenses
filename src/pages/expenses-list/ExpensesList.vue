<template>
  <div>
    <div class="months-navigation">
      <div
        class="month-link"
        v-for="(item, index) in groupedMonths"
        :key="index"
        :class="{ active: item.month === activeMonth.month }"
      >
      <div class="value-label">
        {{ item.month }}
      </div>
      <div class="value-label" v-money-format="item.total" />
      </div>
    </div>

    <div class="container">
      <div v-if="!activeMonth.data.length">
        Você não cadastrou gasto neste mês
      </div>
      <template v-else>
        <expense-list-item
          v-for="(item, index) in activeMonth.data"
          :data="item"
          :key="`expense-list-${index}`"/>
      </template>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import groupBy from 'lodash.groupby'
import ExpenseListItem from './ExpensesListItem'

export default {
  name: 'ExpensesList',
  components: { ExpenseListItem },
  data: () => ({
    expenses: [],
    activeMonth: {}
  }),
  created () {
    this.getData()
  },
  mounted () {
    this.setActiveMonth()
  },
  computed: {
    groupedMonths () {
      let groupedMonths = []
      const addCurrentMonth = () => {
        groupedMonths.push({
          data: [],
          total: 0,
          month: moment().format('MM/YYYY')
        })
      }
      if (this.expenses.length) {
        const months = groupBy(this.expenses, i => (
          moment(i.createdAt).format('MM/YYYY')
        ))
        const sortedMonths = Object.keys(months).sort((a, b) => {
          const pattern = 'MM/YYYY HH'
          return moment(`${a} 01`, pattern).isBefore(moment(`${b} 01`, pattern))
            ? -1
            : +1
        })
        groupedMonths = sortedMonths.map(month => ({
          month,
          data: months[month],
          total: months[month].map(i => +i.value).reduce((a, c) => a + c, 0)
        }))
        const lastMonth = moment(groupedMonths[groupedMonths.length - 1].month, 'MM/YYYY')
        if (!lastMonth.isSame(moment(), 'month')) {
          addCurrentMonth()
        }
      } else {
        addCurrentMonth()
      }
      return groupedMonths
    }
  },
  methods: {
    getData () {
      const ref = this.$firebase.database().ref(`/${window.uid}`)
      ref.on('value', snapshot => {
        const values = snapshot.val()
        this.expenses = Object.keys(values).map(i => values[i])
      })
    },
    setActiveMonth (month = null) {
      this.activeMonth = month || this.groupedMonths[this.groupedMonths.length - 1]
    }
  }
}
</script>

<style lang="scss" scoped>
.months-navigation {
  display: flex;
  margin-left: -15px;
  width: calc(100% + 30px);
  background-color: var(--featured-dark);
  .month-link {
    padding: 15px;
    cursor: pointer;
    transition: .4s;
    text-align: center;
    &:hover {
      background-color: var(--featured);
    }
    &.active {
      background-color: var(--featured);
    }
    .value-label {
      color: var(--darker);
      font-size: 8pt;
    }
  }
}

.container-group {
  margin-left: -15px;
  overflow: hidden auto;
  width: calc(100% + 30px);
  height: calc(100vh - 69px);
  .container {
    font-size: 15pt;
    padding-top: 15px;
    padding-bottom: 15px;
  }
}
</style>
