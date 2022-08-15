import { Button, Form, message, Modal, Upload } from "antd"
import { UploadOutlined, UpOutlined }  from "@ant-design/icons"
import Input from "rc-input";
import { SubmitData, submit } from "../api/submit";
import { SubmitProps } from "../interface";
import { LeaderBoardData } from "../api";
import { read } from "fs";
import { readBuilderProgram } from "typescript";

//参考了anyifan的sample

export const ModalSubmit: React.FC <SubmitProps> = (props: SubmitProps) =>{
    const [submitForm] = Form.useForm();
    return (
        <Button
        type = "primary"
        icon = {<UploadOutlined/>}
        onClick={()=>{
            Modal.info({
                afterClose: () => submitForm.resetFields(),
                content: (
                    <Form form={submitForm}>
                        <Form.Item name = "user" label = "学号" required>
                            <Input/>
                        </Form.Item>

                        <Form.Item name = "content" label = "结果" required >
                            <Upload maxCount={1} beforeUpload = {() => false}>
                                <Button icon = {<UpOutlined/>} >上传文件...</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item name="avatar" label = "头像" >
                            <Upload maxCount={1} beforeUpload = {() => false}>
                                <Button icon = {<UpOutlined/>} >上传文件...</Button>
                            </Upload>
                        </Form.Item>
                    </Form>
                ),
                onOk: () => 
                    submitForm
                        .validateFields()
                        .then(async values => {
                            let binary = ''
                            if(values.avatar?.file){
                                let file = values.avatar.file
                                /*
                                const bytes = new Uint8Array(await file.arrayBuffer());
                                for(let i = 0; i < bytes.length; ++i)
                                    binary += String.fromCharCode(bytes[i])
                                    */
                                let reader = new FileReader();
                                reader.readAsDataURL(values.avatar.file)
                                reader.onload = () => binary = reader.result as string
                                reader.onerror = () => console.log(reader.error)
                            }
                            console.log(binary)
                            const submitData = {
                                user: values.user as string,
                                content: (await values.content.file.text()).toString("base64") as string,
                                avatar: binary.substring(23) as string
                            } as SubmitData
                            let data = await submit(submitData) as LeaderBoardData[]
                            props.setLeaderBoard(data)

                        })
                        .catch( err => {
                            console.log(err)
                            message.error(JSON.stringify(err?.errorFields) ?? 'Unknown error')
                        }),
                title: 'Submit',
                
            })
        }}
        
        >
            Submit
        </Button>
    )
};
