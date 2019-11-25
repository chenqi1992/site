// 时间格式，清空方法
import { dateformat } from '@/utils/utils.js'
export const relative = {
    data() {
        return {
        }
    },
    computed: {},
    mounted() {
    },
    activated() {},
    watch: {},
    methods: {
        clearTabledata() {
            
        },
        formatime(row, column, cellValue, index) {
            let date = new Date(cellValue);
            let getTimeResult
            cellValue == '--' ? getTimeResult = '--' : getTimeResult = dateformat(date, 'yyyy-MM-dd hh:mm:ss')
            return getTimeResult;
        },
        handleClose() {
            this.dialogVisible = false
        },
    }
}
export const totalNum = {
    data() {
        return {
            totalNum: {
                orgPersonNumber: 0,
                orgDeviceNumber: 0,
                orgProjectNumber: 0
            },
        }
    },
    computed: {},
    mounted() {},
    activated() {},
    watch: {},
    methods: {
        clearTabledata() {

        },
        handleSelectionChange(val) {
            this.multipleSelection = val
            if (val.length > 0) {
                let orgPersonNumber = [],
                    orgDeviceNumber = [],
                    orgProjectNumber = [];
                val.map(item => {
                    orgPersonNumber.push(item.orgPersonNumber)
                    orgDeviceNumber.push(item.orgDeviceNumber)
                    orgProjectNumber.push(item.orgProjectNumber)
                })
                this.totalNum.orgPersonNumber = orgPersonNumber.reduce(function (prev, cur, index, val) {
                    return prev + cur;
                })
                this.totalNum.orgDeviceNumber = orgDeviceNumber.reduce(function (prev, cur, index, val) {
                    return prev + cur;
                })
                this.totalNum.orgProjectNumber = orgProjectNumber.reduce(function (prev, cur, index, val) {
                    return prev + cur;
                })
            }
        },
        handleClear() {
            this.totalNum = {
                orgPersonNumber: 0,
                orgDeviceNumber: 0,
                orgProjectNumber: 0
            },
            this.$refs.multipleTable.clearSelection();
        },
    }
}