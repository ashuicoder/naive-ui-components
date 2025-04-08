<template>
  <div>
    <BasicForm @register="register"></BasicForm>
  </div>
</template>

<script setup lang="ts">
import { BasicForm, useForm } from 'naive-ui-form'

const [register] = useForm({
  grid: {
    cols: 3,
    xGap: 16
  },

  schemas: [
    {
      label: '真实姓名',
      field: 'name',
      type: 'text',
      groupName: '基本信息'
    },
    {
      label: '性别',
      field: 'sex',
      type: 'text'
    },
    {
      label: '身份证号',
      field: 'idCard',
      type: 'text'
    },
    {
      label: '出生年月',
      field: 'birthday',
      type: 'text'
    },
    {
      label: '联系电话',
      field: 'phone',
      type: 'text'
    },
    {
      label: '民族',
      field: 'ethnicity',
      type: 'select',
      required: true,
      componentProps: {
        options: []
      }
    },
    {
      label: '现户籍地',
      field: 'currentResidence',
      type: 'input',
      required: true
    },
    {
      label: '婚姻状况',
      field: 'maritalStatus',
      type: 'select',
      required: true,
      componentProps: {
        options: []
      }
    },
    {
      label: '籍贯',
      field: 'nativePlace',
      type: 'input',
      required: true
    },
    {
      label: '政治面貌',
      field: 'politicalAffiliation',
      type: 'select',
      required: true,
      componentProps: {
        options: []
      }
    },
    {
      label: '通讯地址',
      field: 'address',
      type: 'input',
      required: true
    },
    {
      label: '邮编',
      field: 'postalCode',
      type: 'input'
    },
    {
      label: '毕业院校',
      field: 'schoolName',
      type: 'input',
      required: true
    },
    {
      label: '所学专业',
      field: 'major',
      type: 'input',
      required: true
    },
    {
      label: '学历',
      field: 'educationLevel',
      type: 'select',
      required: true,
      componentProps: {
        options: []
      }
    },
    {
      label: '学位',
      field: 'degree',
      type: 'select',
      required: true,
      componentProps: {
        options: []
      }
    },
    {
      label: '人员类型',
      field: 'personnelType',
      type: 'select',
      required: true,
      componentProps: {
        options: []
      }
    },
    {
      label: '毕业时间',
      field: 'graduationDate',
      type: 'date-picker',
      required: true,
      componentProps: {
        type: 'date',
        format: 'yyyy-MM-dd'
      }
    },
    {
      label: '毕业证书编号',
      field: 'graduationCertificateNo',
      type: 'input',
      required: true
    },
    {
      label: '外语水平',
      field: 'foreignLanguageLevel',
      type: 'select',
      required: true,
      componentProps: {
        options: []
      }
    },
    {
      label: '计算机水平',
      field: 'computerLevel',
      type: 'select',
      required: true,
      componentProps: {
        options: []
      }
    },
    {
      label: '现工作单位',
      field: 'currentCompany',
      type: 'input',
      required: true
    },
    {
      label: '单位性质',
      field: 'companyNature',
      type: 'select',
      required: true,
      componentProps: {
        options: []
      }
    },
    {
      label: '裸眼视力',
      field: 'nakedVision',
      type: 'input-number',

      componentProps: {
        precision: 1,
        showButton: false
      }
    },
    {
      label: '矫正视力',
      field: 'correctedVision',
      type: 'input-number',
      componentProps: {
        precision: 1,
        showButton: false
      }
    },
    {
      label: '身高(cm)',
      field: 'height',
      type: 'input-number',
      componentProps: {
        precision: 0,
        showButton: false
      }
    },

    {
      label: '专业技术资格证书',
      field: 'professionalQualification',
      type: 'input'
    },
    {
      label: '	职业(执业)资格证书',
      field: 'vocationalQualification',
      type: 'input'
    },

    {
      field: 'educationList',
      type: 'dynamic',
      groupName: '教育经历',
      span: 3,

      dynamicOptions: [
        {
          field: 'startDate',
          required: true,
          type: 'date-picker',
          componentProps: {
            placeholder: '开始时间'
          }
        },
        {
          field: 'endDate',
          type: 'date-picker',
          required: true,
          componentProps: {
            placeholder: '毕业时间'
          }
        },
        {
          field: 'schoolName',
          required: true,
          type: 'input',
          componentProps: {
            placeholder: '学校名称'
          }
        },
        {
          field: 'major',
          required: true,
          type: 'input',
          componentProps: {
            placeholder: '所学专业'
          }
        },

        {
          field: 'educationLevel',
          type: 'select',
          required: true,
          componentProps: {
            options: [],
            placeholder: '学历'
          }
        },
        {
          field: 'degree',
          type: 'select',
          required: true,
          componentProps: {
            options: [],
            placeholder: '学位'
          }
        }
      ]
    }
  ]
})
</script>

<style scoped></style>
