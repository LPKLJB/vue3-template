<template>
    <div class="list_container">
        <div class="operate_conatiner">
            <el-button class="add_button" type="primary" @click="handleAdd"
                >添加</el-button
            >
        </div>

        <div class="table_container">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="index" label="#" width="50">
                </el-table-column>
                <el-table-column prop="name" label="姓名"> </el-table-column>
                <el-table-column prop="address" label="地址"> </el-table-column>
                <el-table-column prop="number" label="电话号码">
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button
                            type="primary"
                            @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="添加"
            v-model="dialogVisible"
            width="30%"
            @close="resetForm"
        >
            <el-form :model="addForm" :rules="formRules" ref="formRef">
                <el-form-item prop="name" label="姓名" :label-width="80">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item prop="address" label="地址" :label-width="80">
                    <el-input v-model="addForm.address"></el-input>
                </el-form-item>
                <el-form-item prop="number" label="电话号码" :label-width="80">
                    <el-input
                        v-model="addForm.number"
                        maxlength="11"
                    ></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleTable">确 定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from "vue";
export default defineComponent({
    name: "Documentation",
    setup() {
        let tableData = reactive([]);
        const dialogVisible = ref(false);
        const formRef = ref(null); // 要return
        const handleAdd = () => {
            dialogVisible.value = true;
        };

        const validateAddress = (rule, value, callback) => {
            if (!value) {
                callback(new Error("请输入!"));
            } else if (value.length < 5) {
                callback(new Error("请输入超过5位的地址!"));
            } else {
                callback();
            }
        };
        const validateNumber = (rule, value, callback) => {
            if (!value) {
                callback(new Error("请输入!"));
            } else if (value.length != 11) {
                callback(new Error("手机号码为11位!"));
            } else {
                callback();
            }
        };
        const formState = reactive({
            addForm: {
                name: "",
                address: "",
                number: "",
            },
            formRules: {
                name: [
                    {
                        required: true,
                        message: "请输入",
                        trigger: "blur",
                    },
                ],
                address: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validateAddress,
                    },
                ],
                number: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validateNumber,
                    },
                ],
            },
        });
        const handleTable = () => {
            formRef.value.validate((valid) => {
                if (valid) {
                    dialogVisible.value = false;
                    formState.addForm.id = new Date().getTime();
                    tableData.push(formState.addForm);
                }
            });
        };
        const handleDelete = (index) => {
            tableData.splice(index, 1);
        };
        const resetForm = () => {
            formState.addForm = {
                id: "",
                name: "",
                address: "",
                number: "",
            };
        };
        return {
            tableData,
            dialogVisible,
            formRef,
            handleAdd,
            handleTable,
            handleDelete,
            resetForm,
            ...toRefs(formState),
        };
    },
});
</script>
<style lang="scss" scoped>
.list_container {
    overflow: hidden;
    .operate_conatiner {
        margin-top: 20px;
        text-align: right;
        margin-right: 100px;
    }
}
</style>
