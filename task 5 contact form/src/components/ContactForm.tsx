import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

const ContactForm = () => {
    const form = useForm();
    const { handleSubmit, register, control, formState: { errors } } = form;

    function onsubmit(data: unknown) {
        console.log(data);
    }

    return (
        <div>
            <form className="form" onSubmit={handleSubmit(onsubmit)}>
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        {...register('name', { required: 'Name is required' })}
                        className="name"
                    />
                    <center>{errors.name && <span style={{color:'red'}}>{errors.name.message as string}</span>} </center>
                </div>
                <input type="email" placeholder="Email" {...register('email',{required:('email is required '),pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email address'
                }})} className="email" />
                {errors.email && <span style={{color:'red'}}>{errors.email.message as string }</span>}
                <textarea placeholder="Message" {...register('message' ,{required:('text is required '),} )} className="message"></textarea>
                {errors.message && <span style={{color:'red'}}>{errors.message.message as string }</span>}

                <button type="submit" className="submit">Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    );
};

export default ContactForm;