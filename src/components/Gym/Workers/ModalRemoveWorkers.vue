<template>
<b-modal id="modalRemoveWorker" title="Remover funcionário" hide-footer no-close-on-backdrop no-close-on-esc>
    <p class="modalText mb-0">
        Você está prestes a remover o funcionário <span>{{worker ? worker.name : ""}}</span>, tem certeza disso?
    </p>
    <div class="d-flex justify-content-end align-items-center mt-5">
        <button class="bCancel btn btn-secondary" @click.prevent="closeModal('modalRemoveWorker')">Cancelar</button>
        <button class="bCancel btn btn-danger ml-3" @click.prevent="removeWorker()"><i class="fas fa-trash-alt mr-2"></i>Remover</button>
    </div>
</b-modal>  
</template>
<script>

export default {
name: 'ModalRemoveWorkers',
props: ['slug','worker','someDelete'],
methods: {
    
    async removeWorker() {
        this.$api.deleteWorkers(this.slug,this.worker.id).then(res=> {
            if(res.data.msg == 'success') {
                this.$emit("update:someDelete",!this.someDelete)
                this.closeModal("modalRemoveWorker")
            }else {
                var resCode = res.data.code
                switch (resCode) {
                    case '001':
                        this.makeToast('warning','Verifique o slug e tente novamente. É aconselhável que saia e entre novamente no sistema!')
                    break;
                    case '002': 
                        this.makeToast('warning','Nenhum funcionário com este nome, talvez ele já tenha sido excluído!')
                    break;
                
                    default:
                        this.makeToast('danger','Não foi possível remover o funcionário, tente novamente mais tarde!')
                    break;
                }
            }
        })
    }
}
}
</script>

<style lang="scss" scoped>
.modalText {
    font-size: 1.5rem;
    span {
        color: #00ca8d;
        font-weight: 700;
    }
}
</style>