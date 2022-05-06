export const methods = {
  goTo(path) {
    this.$router.push(path)
  },
  statesFromBrazil() {
    return [
      {value:'AC',text:'Acre (AC)'},
      {value:'AL',text:'Alagoas (AL)'},
      {value:'AM',text:'Amazonas (AM)'},
      {value:'AP',text:'Amapá (AP)'},
      {value:'BA',text:'Bahia (BA)'},
      {value:'CE',text:'Ceará (CE)'},
      {value:'DF',text:'Distrito Federal (DF)'},
      {value:'ES',text:'Espírito Santo (ES)'},
      {value:'GO',text:'Goiás (GO)'},
      {value:'MA',text:'Maranhão (MA)'},
      {value:'MG',text:'Minas Gerais (MG)'},
      {value:'MS',text:'Mato Grosso do Sul (MS)'},
      {value:'MT',text:'Mato Grosso (MT)'},
      {value:'PA',text:'Pará (PA)'},
      {value:'PB',text:'Paraíba (PB)'},
      {value:'PE',text:'Pernambuco (PE)'},
      {value:'PI',text:'Piauí (PI)'},
      {value:'PR',text:'Paraná (PR)'},
      {value:'RJ',text:'Rio de Janeiro (RJ)'},
      {value:'RN',text:'Rio Grande do Norte (RN)'},
      {value:'RO',text:'Rondônia (RO)'},
      {value:'RR',text:'Roraima (RR)'},
      {value:'RS',text:'Rio Grande do Sul (RS)'},
      {value:'SC',text:'Santa Catarina (SC)'},
      {value:'SE',text:'Sergipe (SE)'},
      {value:'SP',text:'São Paulo (SP)'},
      {value:'TO',text:'Tocantins (TO)'},
    ]
  },
  closeModal(modal) {
    this.$bvModal.hide(modal)
  },
  openModal(modal) {
    this.$bvModal.show(modal)
  },
  curencyOptions() {
    return {
      currency: 'BRL',
      locale: 'pt-BR',
      currencyDisplay: 'hidden',
      autoDecimalDigits: true,
      precision: 2,
      autoSign: false,
      useGrouping:true,
      valueRange: {
          min:0,
          max:undefined
      },
      hideCurrencySymbolOnFocus:false,
      hideGroupingSeparatorOnFocus:false
  }
  },
  makeToast(variant = null,msg) {
    this.$bvToast.toast(`${msg}`, {
      title: `Aviso`,
      variant: variant,
      solid: true
    })
  },
  setWeekDay(weeDay) {
    var writtenDay = ''
    switch (`${weeDay}`) {
        case '0':
        writtenDay = 'Domingo'
        break;
        case '1':
        writtenDay = 'Segunda-feira'
        break;
        case '2':
        writtenDay = 'Terça-feira'
        break;
        case '3':
        writtenDay = 'Quarta-feira'
        break;
        case '4':
        writtenDay = 'Quinta-feira'
        break;
        case '5':
        writtenDay = 'Sexta-feira'
        break;
        case '6':
        writtenDay = 'Sábado'
        break;                
    }
    return writtenDay
},
}
