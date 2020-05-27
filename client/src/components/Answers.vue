<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Spells</h1>
        <hr><br><br>
        <alert :message=message v-if="showMessage"></alert>
        <button type="button"
                class="btn btn-success btn-sm"
                v-b-modal.answer-modal>
            Add Spell
        </button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(answer, index) in answers" :key="index">
              <td>{{ answer.title }}</td>
              <span v-html="answer.body"></span>
              <!--pre>{{ answer.body }}</pre-->
              <td>
                <div class="btn-group" role="group">
                  <button
                          type="button"
                          class="btn btn-warning btn-sm"
                          v-b-modal.answer-update-modal
                          @click="editAnswer(answer)">
                      Update
                  </button>
                  <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="onDeleteAnswer(answer)">
                      Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <b-modal ref="addAnswerModal"
            id="answer-modal"
            title="Add a new spell"
            hide-footer>
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
      <b-form-group id="form-title-group"
                    label="Title:"
                    label-for="form-title-input">
          <b-form-input id="form-title-input"
                        type="text"
                        v-model="addAnswerForm.title"
                        required
                        placeholder="Enter title">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-body-group"
                      label="Content:"
                      label-for="form-body-input">
            <b-form-input id="form-body-input"
                          type="text"
                          v-model="addAnswerForm.body"
                          required
                          placeholder="Enter content">
            </b-form-input>
          </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-button-group>
      </b-form>
    </b-modal>
    <b-modal ref="editAnswerModal"
            id="answer-update-modal"
            title="Update"
            hide-footer>
      <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
      <b-form-group id="form-title-edit-group"
                    label="Title:"
                    label-for="form-title-edit-input">
          <b-form-input id="form-title-edit-input"
                        type="text"
                        v-model="editForm.title"
                        required
                        placeholder="Enter title">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-body-edit-group"
                      label="Content:"
                      label-for="form-body-edit-input">
            <b-form-input id="form-body-edit-input"
                          type="text"
                          v-model="editForm.body"
                          required
                          placeholder="Enter content">
            </b-form-input>
          </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="primary">Update</b-button>
          <b-button type="reset" variant="danger">Cancel</b-button>
        </b-button-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import Alert from './Alert.vue';

export default {
  data() {
    return {
      answers: [],
      addAnswerForm: {
        title: '',
        body: '',
      },
      message: '',
      showMessage: false,
      editForm: {
        id: '',
        title: '',
        body: '',
      },
    };
  },
  components: {
    alert: Alert,
  },
  methods: {
    getAnswers() {
      const path = 'http://localhost:5000/answers';
      axios.get(path)
        .then((res) => {
          this.answers = res.data.answers;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    addAnswer(payload) {
      const path = 'http://localhost:5000/answers';
      axios.post(path, payload)
        .then(() => {
          this.getAnswers();
          this.message = 'Answer added!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.getAnswers();
        });
    },
    initForm() {
      this.addAnswerForm.title = '';
      this.addAnswerForm.body = '';
      this.editForm.id = '';
      this.editForm.title = '';
      this.editForm.body = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addAnswerModal.hide();
      const payload = {
        title: this.addAnswerForm.title,
        body: this.addAnswerForm.body,
      };
      this.addAnswer(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addAnswerModal.hide();
      this.initForm();
    },
    editAnswer(answer) {
      this.editForm = answer;
    },
    onSubmitUpdate(evt) {
      evt.preventDefault();
      this.$refs.editAnswerModal.hide();
      const payload = {
        title: this.editForm.title,
        body: this.editForm.body,
      };
      this.updateAnswer(payload, this.editForm.answer_pk);
    },
    updateAnswer(payload, answerID) {
      const path = `http://localhost:5000/answers/${answerID}`;
      axios.put(path, payload)
        .then(() => {
          this.getAnswers();
          this.message = 'Answer updated!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.getAnswers();
        });
    },
    onResetUpdate(evt) {
      evt.preventDefault();
      this.$refs.editAnswerModal.hide();
      this.initForm();
      this.getAnswers(); // why?
    },
    removeAnswer(answerID) {
      const path = `http://localhost:5000/answers/${answerID}`;
      axios.delete(path)
        .then(() => {
          this.getAnswers();
          this.message = 'Answer removed!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.getAnswers();
        });
    },
    onDeleteAnswer(answer) {
      this.removeAnswer(answer.answer_pk);
    }
  },
  created() {
    this.getAnswers();
  },
};
</script>
