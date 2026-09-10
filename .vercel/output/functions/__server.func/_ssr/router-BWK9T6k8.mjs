import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { S as useRouter, _ as createRootRouteWithContext, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BWK9T6k8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-Geig2Y_y.css";
var rk_logo_jpg_asset_default = {
	version: 1,
	asset_id: "dc4122b0-977d-4bcf-9355-e8f2dc323880",
	project_id: "5d5d47cf-059d-451e-82ec-aace12681c92",
	url: "/__l5e/assets-v1/dc4122b0-977d-4bcf-9355-e8f2dc323880/rk-logo.jpg",
	r2_key: "a/v1/5d5d47cf-059d-451e-82ec-aace12681c92/dc4122b0-977d-4bcf-9355-e8f2dc323880/rk-logo.jpg",
	original_filename: "rk-logo.jpg",
	size: 65203,
	content_type: "image/jpeg",
	created_at: "2026-07-23T12:42:07Z"
};
var ThemeCtx = (0, import_react.createContext)(null);
var STORAGE_KEY = "rk-theme";
function applyTheme(t) {
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	root.classList.remove("light", "dark");
	root.classList.add(t);
	root.style.colorScheme = t;
}
function ThemeProvider({ children }) {
	const [theme, setThemeState] = (0, import_react.useState)("dark");
	(0, import_react.useEffect)(() => {
		const stored = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);
		const prefersLight = typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: light)").matches;
		const initial = stored ?? (prefersLight ? "light" : "dark");
		setThemeState(initial);
		applyTheme(initial);
	}, []);
	const setTheme = (t) => {
		setThemeState(t);
		applyTheme(t);
		try {
			localStorage.setItem(STORAGE_KEY, t);
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeCtx.Provider, {
		value: {
			theme,
			toggle: () => setTheme(theme === "dark" ? "light" : "dark"),
			setTheme
		},
		children
	});
}
function useTheme() {
	const ctx = (0, import_react.useContext)(ThemeCtx);
	if (!ctx) return {
		theme: "dark",
		toggle: () => {},
		setTheme: () => {}
	};
	return ctx;
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$19 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:site_name",
				content: "RK Repair Labs"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			type: "image/jpeg",
			href: rk_logo_jpg_asset_default.url
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Organization",
				name: "RK Repair Labs",
				url: "https://rklabs.syncailabs.in",
				logo: "https://rklabs.syncailabs.in/favicon.ico",
				description: "AI-powered repair shop management for mobile, laptop and electronics service centers."
			})
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `(function(){try{var t=localStorage.getItem('rk-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(t);r.style.colorScheme=t;}catch(e){}})();` } })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$19.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var $$splitComponentImporter$17 = () => import("./route-4OaCtdAT.mjs");
var Route$18 = createFileRoute("/_authenticated")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("../_public-Brd3hjIz.mjs");
var Route$17 = createFileRoute("/_public")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./auth-DkgGNlWv.mjs");
var Route$16 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Sign in — RK Repair Labs" }, {
		name: "description",
		content: "Sign in to the RK Repair Labs shop dashboard, or create a customer or employee account to get started."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var BASE_URL = "https://rklabs.syncailabs.in";
var Route$15 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[
			{
				path: "/",
				changefreq: "weekly",
				priority: "1.0"
			},
			{
				path: "/track",
				changefreq: "monthly",
				priority: "0.8"
			},
			{
				path: "/auth",
				changefreq: "monthly",
				priority: "0.5"
			}
		].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$14 = () => import("./approvals-CY2LUDCt.mjs");
var Route$14 = createFileRoute("/_authenticated/approvals")({
	head: () => ({ meta: [{ title: "Approvals — RK Repair Labs" }, {
		name: "description",
		content: "Approve or reject new user signups for your repair shop."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./billing-D-ls1-zs.mjs");
var Route$13 = createFileRoute("/_authenticated/billing")({
	head: () => ({ meta: [{ title: "Billing — RK Labs" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./customers-B5x8jtyt2.mjs");
var Route$12 = createFileRoute("/_authenticated/customers")({
	head: () => ({ meta: [{ title: "Customers — RK Labs" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./dashboard-CL0Jbkre.mjs");
var Route$11 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard — RK Labs" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./inventory-DeAcK-Vq2.mjs");
var Route$10 = createFileRoute("/_authenticated/inventory")({
	head: () => ({ meta: [{ title: "Inventory — RK Labs" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./pnl-BeEKQy-w.mjs");
var Route$9 = createFileRoute("/_authenticated/pnl")({
	head: () => ({ meta: [{ title: "Profit & Loss — RK Labs" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./repairs-Dja7DQNR.mjs");
var Route$8 = createFileRoute("/_authenticated/repairs")({
	head: () => ({ meta: [{ title: "Repairs — RK Labs" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./reports-Bs4SY2pA.mjs");
var Route$7 = createFileRoute("/_authenticated/reports")({
	head: () => ({ meta: [{ title: "Reports — RK Labs" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./settings-CqHolEnv.mjs");
var Route$6 = createFileRoute("/_authenticated/settings")({
	head: () => ({ meta: [{ title: "Settings — RK Labs" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./suppliers-Bd92Od-J.mjs");
var Route$5 = createFileRoute("/_authenticated/suppliers")({
	head: () => ({ meta: [{ title: "Suppliers — RK Labs" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("../_public.index-BbtbYz4V.mjs");
var Route$4 = createFileRoute("/_public/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("../_public.about-DdHgOtGY.mjs");
var Route$3 = createFileRoute("/_public/about")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("../_public.contact-DO3blvn7.mjs");
var Route$2 = createFileRoute("/_public/contact")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("../_public.services-C140CM-7.mjs");
var Route$1 = createFileRoute("/_public/services")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("../_public.track-peMcRIFJ.mjs");
var Route = createFileRoute("/_public/track")({
	head: () => ({
		meta: [
			{ title: "Track Your Repair — RK Repair Labs" },
			{
				name: "description",
				content: "Enter your ticket ID (e.g. RK-1001) to see the live status, technician notes and appointment for your device repair at RK Repair Labs."
			},
			{
				property: "og:title",
				content: "Track Your Repair — RK Repair Labs"
			},
			{
				property: "og:description",
				content: "Real-time repair status lookup — see workflow progress, technician assignment and appointment details by ticket ID."
			},
			{
				property: "og:url",
				content: "https://rklabs.syncailabs.in/track"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://rklabs.syncailabs.in/track"
		}]
	}),
	validateSearch: (s) => ({ id: typeof s.id === "string" ? s.id : "" }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var AuthenticatedRouteRoute = Route$18.update({
	id: "/_authenticated",
	getParentRoute: () => Route$19
});
var PublicRoute = Route$17.update({
	id: "/_public",
	getParentRoute: () => Route$19
});
var AuthRoute = Route$16.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$19
});
var SitemapDotxmlRoute = Route$15.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$19
});
var AuthenticatedApprovalsRoute = Route$14.update({
	id: "/approvals",
	path: "/approvals",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedBillingRoute = Route$13.update({
	id: "/billing",
	path: "/billing",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCustomersRoute = Route$12.update({
	id: "/customers",
	path: "/customers",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$11.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedInventoryRoute = Route$10.update({
	id: "/inventory",
	path: "/inventory",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPnlRoute = Route$9.update({
	id: "/pnl",
	path: "/pnl",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRepairsRoute = Route$8.update({
	id: "/repairs",
	path: "/repairs",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedReportsRoute = Route$7.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSettingsRoute = Route$6.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSuppliersRoute = Route$5.update({
	id: "/suppliers",
	path: "/suppliers",
	getParentRoute: () => AuthenticatedRouteRoute
});
var PublicIndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => PublicRoute
});
var PublicAboutRoute = Route$3.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => PublicRoute
});
var PublicContactRoute = Route$2.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => PublicRoute
});
var PublicServicesRoute = Route$1.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => PublicRoute
});
var PublicTrackRoute = Route.update({
	id: "/track",
	path: "/track",
	getParentRoute: () => PublicRoute
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedApprovalsRoute,
	AuthenticatedBillingRoute,
	AuthenticatedCustomersRoute,
	AuthenticatedDashboardRoute,
	AuthenticatedInventoryRoute,
	AuthenticatedPnlRoute,
	AuthenticatedRepairsRoute,
	AuthenticatedReportsRoute,
	AuthenticatedSettingsRoute,
	AuthenticatedSuppliersRoute
};
var AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
var PublicRouteChildren = {
	PublicAboutRoute,
	PublicContactRoute,
	PublicServicesRoute,
	PublicTrackRoute,
	PublicIndexRoute
};
var rootRouteChildren = {
	AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
	PublicRoute: PublicRoute._addFileChildren(PublicRouteChildren),
	AuthRoute,
	SitemapDotxmlRoute
};
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadDelay: 50,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { useTheme as n, router_exports as t };
