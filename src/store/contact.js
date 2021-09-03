import axios from 'axios'

export default {
    namespaced: true,
    state: {
        allContact:[],
        myContact:[],
        companyContact:[],
        groupContact:[],
        personalContact:[],
        publicContact:[],
        publicDataList:[],
    },
    getters: {
        allContact: state => {
            return state.allContact;
        },
        myContact: state => {
            return state.myContact;
        },
        companyContact: state => {
            return state.companyContact;
        },
        groupContact: state => {
            return state.groupContact;
        },
        publicContact: state => {
            return state.publicContact;
        },
        personalContact: state => {
            return state.personalContact;
        },
        publicDataList: state => {
            return state.publicDataList;
        },
    },
    mutations: {
        SET_AllContact (state, allContact){
            state.allContact = allContact
        },
        SET_MyContact (state, myContact){
            state.myContact = myContact
        },
        SET_CompanyContact (state, companyContact){
            state.companyContact = companyContact
        },
        SET_GroupContact (state, groupContact){
            state.groupContact = groupContact
        },
        SET_PublicContact (state, publicContact){
            state.publicContact = publicContact
        },
        SET_PersonalContact (state, personalContact){
            state.personalContact = personalContact
        },
        SET_PublicDataList (state, publicDataList){
            state.publicDataList = publicDataList
        },

    },
    actions: {
        loadAllContact({ commit })  { //전체 연락처
            axios({
                method: 'GET',
                url: '/api/v1/contacts',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            })
                .then(res => res.data)
                .then(allContact => {
                    //console.log(`allContact >> ${allContact}`);
                    commit('SET_AllContact', allContact);
                })
        },
        loadMyContact({ commit })  { //내 연락처
            axios({
                method: 'GET',
                url: '/api/v1/users/my-contacts',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            })
                .then(res => res.data)
                .then(myContact => {
                    //console.log(`myContact >> ${myContact}`);
                    commit('SET_MyContact', myContact);
                })
        },
        loadCompanyContact({ commit })  { //기업별 연락처
            axios({
                method: 'GET',
                url: '/api/v1/companies',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            })
                .then(res => res.data)
                .then(companyContact => {
                    //console.log(`companyContact >> ${companyContact}`);
                    commit('SET_CompanyContact', companyContact);
                })
        },
        loadGroupContact({ commit })  { //그룹별 연락처
            axios({
                method: 'GET',
                url: '/api/v1/group',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            })
                .then(res => res.data)
                .then(groupContact => {
                    //console.log(`groupContact >> ${groupContact}`);
                    commit('SET_GroupContact', groupContact);
                })
        },
        loadPublicContact({ commit })  { //기관별 연락처
            axios({
                method: 'GET',
                url: '/api/v1/public-contacts',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            })
                .then(res => res.data)
                .then(publicContact => {
                    //console.log(`publicContact >> ${publicContact}`);
                    commit('SET_PublicContact', publicContact);
                })
        },
        loadPersonalContact({ commit })  { // 개인별 연락처
            axios({
                method: 'GET',
                url: '/api/v1/personal-contacts',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            })
                .then(res => res.data)
                .then(personalContact => {
                    //console.log(`personalContact >> ${personalContact}`);
                    commit('SET_PersonalContact', personalContact);
                })
        },
        loadPublicDataList({ commit }) { // 기관 데이터
            axios({
                url: '/api/v1/public',
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            })
                .then(res => res.data.data)
                .then(publicDataList => {
                    //console.log(`publicDataList >> ${publicDataList}`);
                    commit('SET_PublicDataList', publicDataList);
                })
        },
    },
}
