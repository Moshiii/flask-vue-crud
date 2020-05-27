<template>
  <a-layout id="components-layout-demo-top">
    <Header />
    <a-layout-content :style="{}">
      <section :style="{ padding: '64px 50px', backgroundColor: 'white' }">
        <a-input-search placeholder="input search text" @search="onSearch" size="large" />
        <br />
        <br />
      </section>
      <section :style="{ padding: '64px 50px' }">
        <a-button type="primary" @click="showAddAnswer" :style="{ marginBottom: '10px' }">
          Add Answer
        </a-button>
        <add-answer-modal
          ref="addForm"
          :visible="addAnswer"
          @cancel="handleAnswerCancel"
          @submit="handleAnswerOk"
        />
        <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="answers">
          <a-list-item
            slot="renderItem"
            key="item.title"
            slot-scope="item"
            :style="{
              border: '1px solid #e8e8e8',
              backgroundColor: 'white',
              padding: '20px',
              marginBottom: '10px',
            }"
          >
            <template slot="actions">
              <span @click="() => showEditAnswer(item)">
                <a-icon type="edit" style="margin-right: 8px" />
                Edit
              </span>
              <span @click="() => handleDelete(item)">
                <a-icon type="delete" style="margin-right: 8px" />
                Delete
              </span>
              <span>
                <a-icon type="star-o" style="margin-right: 8px" />
                Star
              </span>
            </template>
            <a-list-item-meta>
              <a slot="title" :href="item.href">{{ item.title }}</a>
            </a-list-item-meta>
            <p v-html="item.body"></p>
            <small
              ><p>answer_pk: {{ item.answer_pk }}</p></small
            >
          </a-list-item>
        </a-list>
        <edit-answer-modal
          :visible="editAnswer"
          :currentAnswer="currentAnswer"
          :getAnswers="getAnswers"
          :handleEditCancel="handleEditCancel"
          @cancel="handleEditCancel"
        />
      </section>
    </a-layout-content>
    <Footer />
  </a-layout>
</template>

<script>
import axios from 'axios';
import EditAnswer from './modals/EditAnswer.vue';

const CollectionCreateForm = {
  props: ['visible'],
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'form_in_modal' });
  },
  template: `
    <a-modal
      :visible="visible"
      title='Create a new collection'
      okText='Submit'
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('submit') }"
    >
      <a-form layout='vertical' :form="form">
        <a-form-item label='Title'>
          <a-input
            v-decorator="[
              'title',
              {
                rules: [{ required: true, message: 'Please input the title.' }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item label='Content' class='collection-create-form_last-form-item'>
          <a-input
            type='textarea'
            v-decorator="['body',
            {
              rules: [{ required: true, message: 'Please input the title.' }],
            }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  `,
};

export default {
  components: { AddAnswerModal: CollectionCreateForm, EditAnswerModal: EditAnswer },
  data() {
    return {
      cmOptions: {
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
      },
      answers: [],
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      },
      addAnswer: false,
      editAnswer: false,
      currentAnswer: {},
      confirmLoading: false,
    };
  },
  methods: {
    onSearch(value) {
      const path = `http://localhost:5000/answers?query=${value}`;
      axios
        .get(path)
        .then((res) => {
          this.answers = res.data.answers;
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    getAnswers() {
      const path = 'http://localhost:5000/answers';
      axios
        .get(path)
        .then((res) => {
          this.answers = res.data.answers;
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    showAddAnswer() {
      this.addAnswer = true;
    },
    showEditAnswer(answer) {
      console.log(answer);
      this.currentAnswer = answer;
      this.editAnswer = true;
    },
    handleAnswerOk() {
      const { form } = this.$refs.addForm;
      form.validateFields((err, values) => {
        if (!err) {
          form.resetFields();
          const path = 'http://localhost:5000/answers';
          axios
            .post(path, values)
            .then((res) => {
              this.answers = res.data.answers;
              this.addAnswer = false;
              this.$message.success('Answer added!');
            })
            .catch((error) => {
              this.$message.error(error);
            });
        }
      });
    },
    handleAnswerCancel() {
      const { form } = this.$refs.addForm;
      form.resetFields();
      this.addAnswer = false;
    },
    handleEditCancel() {
      this.editAnswer = false;
    },
    handleDelete(item) {
      const path = `http://localhost:5000/answers/${item.answer_pk}`;
      axios
        .delete(path)
        .then(() => {
          this.$message.success('Answer removed!');
          this.getAnswers();
        })
        .catch((error) => {
          this.$message.error(error);
          this.getAnswers();
        });
    },
  },
  created() {
    this.getAnswers();
  },
};
</script>

<style scoped></style>
