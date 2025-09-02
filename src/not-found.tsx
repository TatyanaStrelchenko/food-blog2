import Link from 'next/link'

export default function NotFound() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
			<h1 className="text-7xl font-bold mb-4 text-white">404</h1>
			<p className="text-neutral-600 mb-6">
				This page doesn’t exist. Or maybe it moved.
			</p>
			<Link
				href="/"
				className="text-sm hover:underline"
			>
				← Back to home
			</Link>
		</div>
	)
}
