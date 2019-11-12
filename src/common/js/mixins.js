// 时间格式，清空方法
import { dateformat } from '@/utils/utils.js'
export const relative = {
    //上传组件（step2-step3）
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
        }
    }
}