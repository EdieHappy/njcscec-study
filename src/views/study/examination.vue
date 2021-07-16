<template>
    <div class="study-page examination-ing">
        <navbar title="我的考试" :timeLeft="true" ref="studyNavbar" :time="time"></navbar>
        <template v-if="!submitFlag">
        <div class="subject-list">
            <template v-for="(item, index) in questionList">
                <div class="subject-item"  :key="index" v-if="currentSubjectNumber === index + 1">
                    <div class="subject-title">
                        <span class="single-icon">{{`${ +item.type === 1 ? '单选' : '多选'}`}}</span>
                        <span class="title">{{index+1}} . {{item.title}}</span>
                    </div>
                    <div class="subject-answer-check">
                        <div :class="{'check-cell':true, 'check-cell-active': asr.active}" v-for="(asr, j) in item.answer" :key="j" @click="selectAnswer(item, asr)">
                            <div :class="['check-flag', `flag-${j + 1}`]"></div>
                            <div class="check-answer">
                                {{asr.label}}
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div class="select-opt">
            <div class="opt subject-prev" v-if="currentSubjectNumber > 1" @click="prevSubject">上一题</div>
            <div class="opt subject-next" v-if="currentSubjectNumber < questionList.length" @click="nextSubject">下一题</div>
            <div class="opt subject-submit" v-if="currentSubjectNumber === questionList.length" @click="submitSubject">提交答卷</div>
        </div>
        </template>
        <div class="submit-success" v-else>
            <div class="success-icon"></div>
            <div class="success-msg">提交成功</div>
        </div>
    </div>
</template>

<script>
import studyNavbar from '../../components/studyNavbar'
export default {
    name: 'examination',
    data() {
        return {
            examinationId: this.$route.query.examinationId,
            currentSubjectNumber: 1,
            submitFlag: false, // 是否提交考试
            time: 3600000,
            questionList: [],
            answerList: [], // 提交的答案
        }
    },
    components: {
        navbar: studyNavbar
    },
    created() {
        this.getQuestionList()
    },
    methods: {
        // 获取试题
        async getQuestionList() {
            try {
                const { data, code } = await this.$store.dispatch('getExamDetailFun', {
                    examinationId: this.examinationId
                })
                if(+code === 200) {
                    let list = data || []
                    if(list.length === 0) {
                        // 当前试卷已考完
                        this.$dialog.confirm({
                            message: '当前试卷已考完！',
                            confirmButtonText: '返回',
                            showCancelButton: false
                        }).then(() => {
                            console.log('go-back')
                            history.go(-1)
                        })
                    } else {
                         this.questionList = list.map(item => {
                            const { id, subject, optionA, optionB, optionC, optionD, score, questionType } = item
                            return {
                                id,
                                title: subject,
                                type: questionType,
                                score,
                                answer: [
                                    { label: optionA, active: false, labelName: 'A' },
                                    { label: optionB, active: false, labelName: 'B' },
                                    { label: optionC, active: false, labelName: 'C' },
                                    { label: optionD, active: false, labelName: 'D' },
                                ]
                            }
                        })
                        this.$refs.studyNavbar.startCountDown()
                    }
                   
                }
            } catch (error) {
                console.log(error)
            }
        },
        prevSubject() {
            this.currentSubjectNumber --
        },
        nextSubject() {
            this.currentSubjectNumber ++
        },
        // 选择答案
        selectAnswer(subject, answer) {
            // 当前为单选题，并且当前答案为选中的
            if( +subject.type === 1) {
                 if(answer.active) {
                    return
                }
                subject.answer.forEach(asr => {
                    asr.active = false
                })
                answer.active = true
            } else if( +subject.type === 2) {
                 answer.active = !answer.active
            }
           
        },
        submitExam() {
            // 提交答卷
            this.$dialog.confirm({
                message: '确定提交答卷，提交后不可再次修改',
                cancelButtonText:'返回'
            })
            .then(() => {
                // on confirm
                this.submitAction()
            })
            .catch(() => {
                // on cancel
            });
        },
        // 提交答案
        submitSubject() {
            // this.time
            let allDone = true // 全部答完
            this.answerList = this.questionList.map(item => {
                let answerArray = []
                let answerFilter = []
                let answer = ''
                if(item.type === 1) { // 单选题
                    answerFilter = item.answer.filter( cell => { return cell.active }) || []
                    if(answerFilter.length > 0 ) {
                        answer = answerFilter[0].labelName
                    } else {
                        allDone = false
                    }
                } else if(item.type === 2) { // 多选题
                    answerFilter = item.answer.filter( cell => { return cell.active }) || []
                    if(answerFilter.length > 0) {
                        answerArray = answerFilter.map( cell => { return cell.labelName })
                    }
                }
                return {
                    id: item.id,
                    answerArray,
                    answer
                }
            })
            if(!allDone) {
                // 提交答卷
                this.$dialog.confirm({
                    message: '题目未答完，确定提交答卷吗？',
                    cancelButtonText:'返回'
                })
                .then(() => {
                    // on confirm
                    this.submitAction()
                })
                .catch(() => {
                    // on cancel
                }); 
            } else {
                this.submitExam()
            }  
        },
        async submitAction() {
            try {
                const { code, msg } = await this.$store.dispatch('submitExaminationFun', {
                    id: this.examinationId,
                    questionList: this.answerList
                })
                if(+code === 200) {
                    this.submitFlag = true
                    this.$refs.studyNavbar.pauseCountDown()
                } else {
                    this.$toast(msg || '试卷提交错误！')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .examination-ing{
        min-height: 100%;
        background: #fff;
        .subject-list{
            padding:rem(20) rem(20);
            .subject-item{
                .subject-title{
                    // display: flex;
                    // align-items: center;
                    line-height: rem(24);
                    .single-icon{
                        display: inline-flex;
                        align-items: center;
                        border-radius: rem(2) rem(2) rem(2) 0;
                        width:rem(24);
                        height:rem(16);
                        color:#fff;
                        font-size: rem(8);
                        margin-right: rem(8);
                        background:#1D6FE9;
                        justify-content: center;
                        vertical-align: middle;
                    }
                    .title{
                        font-size: rem(16);
                        color:#262626;
                         vertical-align: middle;
                        line-height: rem(24);
                    }
                }
                .subject-answer-check{
                    margin-top: rem(50);
                    .check-cell{
                        display: flex;
                        align-items: center;
                        margin-bottom: rem(30);
                        .check-flag{
                            width: rem(33);
                            height: rem(33);
                            margin-right: rem(15);
                        }
                        .flag-1{
                            background: url(../../assets/img/select-A.png) no-repeat;
                            background-size: rem(33) rem(33);
                        }
                        .flag-2{
                            background: url(../../assets/img/select-B.png) no-repeat;
                            background-size: rem(33) rem(33);
                        }
                        .flag-3{
                            background: url(../../assets/img/select-C.png) no-repeat;
                            background-size: rem(33) rem(33);
                        }
                        .flag-4{
                            background: url(../../assets/img/select-D.png) no-repeat;
                            background-size: rem(33) rem(33);
                        }
                        .check-answer{
                            font-size: rem(15);
                            color:#262626;
                        }
                    }
                    .check-cell-active{
                        .flag-1{
                             background: url(../../assets/img/select-A-active.png) no-repeat;
                            background-size: rem(33) rem(33);
                        }
                         .flag-2{
                            background: url(../../assets/img/select-B-active.png) no-repeat;
                            background-size: rem(33) rem(33);
                        }
                        .flag-3{
                            background: url(../../assets/img/select-C-active.png) no-repeat;
                            background-size: rem(33) rem(33);
                        }
                        .flag-4{
                            background: url(../../assets/img/select-D-active.png) no-repeat;
                            background-size: rem(33) rem(33);
                        }
                    }
                }
            }
        }
        .select-opt{
            display: flex;
            justify-content: center;
            .opt{
                font-size: rem(18);
                color:#1D6FE9;
                width:rem(100);
                text-align: center;
            }
        }
        .submit-success{
            .success-icon{
                width:rem(56);
                height: rem(56);
                background: url(../../assets/img/set-success.png) no-repeat;
                background-size: rem(56) rem(56);
                margin:rem(75) auto 0;
            }
            .success-msg{
                color:#262626;
                font-size: rem(18);
                width:100%;
                text-align: center;
                margin-top: rem(20);
            }
        }
    }

</style>