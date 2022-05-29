<template>
  <b-modal id="modalRemoveStudents" title="Remover Aluno" hide-footer no-close-on-backdrop no-close-on-esc>
    <p class="modalText mb-0">
        Você está prestes a remover o aluno <span>{{student ? student.name : ""}}</span>, tem certeza disso?
    </p>
    <div class="d-flex justify-content-end align-items-center mt-5">
        <button class="bCancel btn btn-secondary" @click.prevent="closeModal('modalRemoveStudents')">Cancelar</button>
        <button class="bCancel btn btn-danger ml-3" @click.prevent="removeStudents()"><i class="fas fa-trash-alt mr-2"></i>Remover</button>
    </div>
</b-modal>  
</template>

<script>
export default {
name: 'ModalRemoveStudent',
props:["slug","student","someDelete"],
methods :{
    removeStudents() {
        this.$api.deleteGymStudent(this.slug,this.student.id).then(res=> {
            if(res.data.msg == 'success') {
                this.$emit("update:someDelete",!this.someDelete)
                this.closeModal("modalRemoveStudents")
            }else {
                var resCode = res.data.code
                switch (resCode) {
                    case '001':
                        this.makeToast('warning','Verifique o slug e tente novamente. É aconselhável que saia e entre novamente no sistema!')
                    break;
                    case '002': 
                        this.makeToast('warning','Nenhum aluno com este nome, talvez ele já tenha sido excluído!')
                    break;
                    default:
                        this.makeToast('danger','Não foi possível remover o aluno, tente novamente mais tarde!')
                    break;
                }
            }
        }).catch(err=> {
            if(err.response.status==401) {
                this.$router.push('/')
            }
            this.makeToast('danger','Não foi possível remover o aluno, tente novamente mais tarde!')
        })
    }
}
}
</script>

<style>

</style>