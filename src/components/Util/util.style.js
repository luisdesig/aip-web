import styled from 'styled-components';
import {
    Input,
    Row,
    Col,
    Select,
    Radio,
    Checkbox,
    Table,
    Modal,
    Tooltip,
    InputNumber,
    Icon,
    Switch,
    Upload,
    Button,
    Tabs,
    Divider,
    AutoComplete,
    Progress,
    Badge,
    Skeleton
} from 'antd';

const FieldContainer = styled.div`
    margin-top: 8px;
    margin-bottom: 8px;
`
const Field = styled.div`
    input {
        border: 1px solid #A9B1D1;
        border-radius: 3px;
        font-size: 14px;
        width: 100%;
        height: 30px;
        text-align: center;
    }
    label {
        text-align: right;
        vertical-align: middle;
        padding-top: 5px;
        color: #676F8F;
        font-size: 12px;
        font-weight: 500;
        span {
            color: red;
        }
    }
    input::placeholder{
        color: #bfbfbf
    }
    .ant-checkbox-wrapper, .ant-radio-group {
        span {
            color:  #676F8F
        }
    }
`

const FieldLabel = styled.div`
    text-align: center
`
const FieldInput = styled.div`
`

const InputForm = styled(Input)`

`
const RowForm = styled(Row)`
    padding: 1px
    text-align: center;
    .ant-checkbox-group, .ant-radio-group {
        margin-top: 5px
    }
`
const RowFormQ = styled(Row)`
    padding: 1px
    text-align: left;
    .ant-checkbox-group, .ant-radio-group {
        margin-top: 5px
    }
`
const ColForm = styled(Col)`
    padding: 2px;
`
const ColFormLabel = styled(Col)`
    text-align: right
`
const LabelFormQ = styled(Col)`
    text-align: left;
    font-size: 12px;
`
const SelectForm = styled(Select)`
    width: 100%;
    .ant-select-selection {
        border: 1px solid #A9B1D1
    }
`
const RadioForm = styled(Radio)`
    display: inline-block;
    margin-right: 20px;
    span {
        font-size: 15px;
        margin-left: 7px;
        vertical-align: top;
        font-family: "Roboto";
    }
`
const CheckboxForm = styled(Checkbox)`
    display: inline-block;
    p {
        color: #676F8F;
        font-size: 5px;
    }
    label {
        padding: 0;
        margin: 0;
        text-align: left;
        span{
            color: #676F8F;
        }
    }
`

const SpanError = styled.span`
    
    color: red;
    padding-left: 10px
`
const TableWrapper = styled(Table)`
  .ant-table-bordered .ant-table-thead > tr > th,
  .ant-table-bordered .ant-table-tbody > tr > td {
    white-space: normal;
    &.noWrapCell {
      white-space: nowrap;
    }

    @media only screen and (max-width: 920px) {
      white-space: nowrap;
    }
  }
  .react-resizable {
    position: relative;
  }
  
  .react-resizable-handle {
    position: absolute;
    width: 10px;
    height: 100%;
    bottom: 0;
    right: -5px;
    cursor: col-resize;
  }
  .ant-table-thead {
      th {
          text-align:center
          label {
              cursor: move
          }
      }
  } 
`
const ModalWrapper = styled(Modal)`

`
const TooltipWrapper = styled(Tooltip)`

`
const IconWrapper = styled(Icon)`
  font-size: 20px;
  .delete{
      color: red
  }
`
const InputNumberForm = styled(InputNumber)`
    
`

const SwitchForm = styled(Switch)`
`

const UploadForm = styled(Upload)`

`
const ButtonForm = styled(Button)`
  .btn-cta-search{
      color: red !important
  }
  .ant-btn btn_secondary{
      color: white !important;
      background: #92d66f !important
  }
`
const AutoCompleteForm = styled(AutoComplete)`
`
const TabsForm = styled(Tabs)`
`
const DividerForm = styled(Divider)`
`
const ProgressForm = styled(Progress)`
`
const BadgeForm = styled(Badge)`
`
const SkeletonForm = styled(Skeleton)`
`
export {
    FieldContainer,
    Field,
    FieldLabel,
    FieldInput,
    InputForm,
    RowForm,
    RowFormQ,
    ColForm,
    ColFormLabel,
    SelectForm,
    RadioForm,
    CheckboxForm,
    TableWrapper,
    ModalWrapper,
    TooltipWrapper,
    IconWrapper,
    InputNumberForm,
    SwitchForm,
    UploadForm,
    ButtonForm,
    SpanError,
    TabsForm,
    DividerForm,
    LabelFormQ,
    AutoCompleteForm,
    ProgressForm,
    BadgeForm,
    SkeletonForm
}