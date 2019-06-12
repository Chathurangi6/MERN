const tests={cbc:{
        title:'Complete Blood Count',
        comp:[
            {name:'WBC Count',
             std:'4000-10000',
             unit:'mm3'
            },
            {name:'RBC Count',
             std:'4.5-6.0',
             unit:'mil/mm3'
            },
            {
                name:'Hemoglobin',
                std:'14-18',
                unit:'g/dL'
            }

        ]
    },
    fbs:{
        title:'Fasting Blood Sugar',
        comp:[
            {
                name:'Glucose',
                std:'65-99',
                unit:'mg/dL'
            }

        ]
    },
    lpd:{
        title:'Lipid Profile',
        comp:[
            {
                name:'Total Cholesterol',
                std:'200-239',
                unit:'mg/dL'
            },
            {
                name:'LDL Cholesterol',
                std:'130-159',
                unit:'mg/dL'
            },
            {
                name:'HDL Cholesterol',
                std:'60-40',
                unit:'mg/dL'
            },
            {
                name:'Triglycerides',
                std:'150-199',
                unit:'mg/dL'
            }
        ]
    },
    ucl:{
        title:'Urine Culture',
        comp:[]
    },
    ura:{
        title:'Urinalysis',
        comp:[]
    }
}

export default tests