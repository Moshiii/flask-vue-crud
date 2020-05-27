<template>
  <a-modal
    :visible="visible"
    title="Create a new collection"
    okText="Submit"
    @cancel="
      () => {
        $emit('cancel');
      }
    "
    @ok="onSubmit"
  >
    <a-form layout="vertical" :form="form">
      <a-form-item label="Title">
        <a-input
          @change="handleTitleChange"
          v-decorator="[
            'title',
            {
              rules: [{ required: true, message: 'Please input the title.' }],
              initialValue: currentAnswer.title,
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="Content" class="collection-create-form_last-form-item">
        <a-input
          type="textarea"
          v-decorator="[
            'body',
            {
              initialValue: currentAnswer.body,
              rules: [{ required: true, message: 'Please input the title.' }],
            },
          ]"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import axios from 'axios';

export default {
  props: ['visible', 'currentAnswer', 'getAnswers', 'handleEditCancel'],
  data() {
    return {
      form: this.$form.createForm(this, { name: 'editAnswerForm' }),
    };
  },
  methods: {
    handleTitleChange(e) {
      const title = e.target.value;
      this.title = title;
    },
    onSubmit() {
      this.form.validateFields((err, values) => {
        const answerPk = this.currentAnswer.answer_pk;
        if (!err) {
          this.form.resetFields();
          const path = `http://localhost:5000/answers/${answerPk}`;
          axios
            .put(path, values)
            .then(() => {
              this.$message.success('Answer updated!');
              this.getAnswers();
              this.handleEditCancel();
            })
            .catch((error) => {
              this.$message.error(error);
              this.getAnswers();
            });
        }
      });
    },
  },
};
</script>
