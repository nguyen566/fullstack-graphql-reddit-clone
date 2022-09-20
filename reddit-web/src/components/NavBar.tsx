import { Box, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
	const [{ data, fetching }] = useMeQuery();
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
			<>
				<NextLink href="">
					<Link mr={2}>{data.me.username}</Link>
				</NextLink>
				<NextLink href="">
					<Link mr={2}>Logout</Link>
				</NextLink>
			</>
		);
	}

	return (
		<Flex bg="#708090" p={4}>
			<Box ml={"auto"}>{body}</Box>
		</Flex>
	);
};