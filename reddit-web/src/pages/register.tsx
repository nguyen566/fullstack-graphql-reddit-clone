import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClients } from "../utils/createUrqlClients";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
	const router = useRouter();
	const [, register] = useRegisterMutation();

	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ username: "", password: "", email: "" }}
				onSubmit={async (values, { setErrors }) => {
					const response = await register({ options: values });
					console.log(response);
					if (response.data?.register?.errors) {
						setErrors(toErrorMap(response.data.register.errors));
					} else if (response.data?.register.user) {
						//worked
						router.push("/");
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<InputField
							name="username"
							placeholder="username"
							label="Username"
						/>
						<Box mt={4}>
							<InputField
								name="password"
								placeholder="password"
								label="Password"
								type="password"
							/>
						</Box>
						<Box mt={4}>
							<InputField
								name="email"
								placeholder="email"
								label="email"
								type="email"
							/>
						</Box>
						<Button
							mt={4}
							type="submit"
							isLoading={isSubmitting}
							colorScheme="teal"
						>
							Register
						</Button>
					</Form>
				)} 
			</Formik>
		</Wrapper>
	);
};

export default withUrqlClient(createUrqlClients)(Register);
