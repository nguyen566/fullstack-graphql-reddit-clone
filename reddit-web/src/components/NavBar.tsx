import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
	const router = useRouter();
	const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
	const [{ data, fetching }] = useMeQuery({
		pause: isServer(),
	});

	let body = null;

	//Data is loading
	if (fetching) {
		//User is not logged in
	} else if (!data?.me) {
		body = (
			<>
				<NextLink href="/login">
					<Link mr={2}>Login</Link>
				</NextLink>
				<NextLink href="/register">
					<Link mr={2}>Register</Link>
				</NextLink>
			</>
		);
		//User is logged in
	} else {
		body = (
			<Flex align="center">
				<Box mr={2}>{data.me.username}</Box>
				<Button
					onClick={() => {
						router.push("/create-post");
					}}
					colorScheme={"teal"}
					mr={2}
				>
					Create Post
				</Button>
				<Button
					onClick={async () => {
						await logout({});
						router.reload();
					}}
					isLoading={logoutFetching}
					colorScheme={"teal"}
				>
					Logout
				</Button>
			</Flex>
		);
	}

	return (
		<Flex
			zIndex={1}
			position="sticky"
			top={0}
			bg="#708090"
			p={4}
			align={"center"}
		>
			<Flex flex={1} m={"auto"} align={"center"} maxW={800}>
				<NextLink href="/">
					<Link>
						<Heading>Reddit</Heading>
					</Link>
				</NextLink>
				<Box ml={"auto"}>{body}</Box>
			</Flex>
		</Flex>
	);
};
