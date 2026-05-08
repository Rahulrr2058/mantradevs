module.exports = [
"[project]/src/components/MantraverseScene.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MantraverseScene",
    ()=>MantraverseScene
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__ = __turbopack_context__.i("[externals]/@react-three/fiber [external] (@react-three/fiber, cjs, [project]/node_modules/@react-three/fiber)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$drei__$5b$external$5d$__$2840$react$2d$three$2f$drei$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$29$__ = __turbopack_context__.i("[externals]/@react-three/drei [external] (@react-three/drei, cjs, [project]/node_modules/@react-three/drei)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
;
;
function Knot() {
    const ref = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__["useFrame"])((_, dt)=>{
        if (!ref.current) return;
        ref.current.rotation.x += dt * 0.25;
        ref.current.rotation.y += dt * 0.35;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("mesh", {
        ref: ref,
        scale: 1.6,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("torusKnotGeometry", {
                args: [
                    1,
                    0.32,
                    220,
                    32
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/MantraverseScene.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$drei__$5b$external$5d$__$2840$react$2d$three$2f$drei$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$29$__["MeshDistortMaterial"], {
                color: "#7c3aed",
                emissive: "#22d3ee",
                emissiveIntensity: 0.55,
                roughness: 0.15,
                metalness: 0.85,
                distort: 0.42,
                speed: 2
            }, void 0, false, {
                fileName: "[project]/src/components/MantraverseScene.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/MantraverseScene.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
function Orb({ position, color, scale = 0.6 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$drei__$5b$external$5d$__$2840$react$2d$three$2f$drei$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$29$__["Float"], {
        speed: 2,
        rotationIntensity: 1,
        floatIntensity: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("mesh", {
            position: position,
            scale: scale,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("icosahedronGeometry", {
                    args: [
                        1,
                        1
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/MantraverseScene.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meshStandardMaterial", {
                    color: color,
                    emissive: color,
                    emissiveIntensity: 0.8,
                    wireframe: true
                }, void 0, false, {
                    fileName: "[project]/src/components/MantraverseScene.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MantraverseScene.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/MantraverseScene.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
function MantraverseScene() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__["Canvas"], {
        camera: {
            position: [
                0,
                0,
                6
            ],
            fov: 55
        },
        dpr: [
            1,
            2
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("color", {
                attach: "background",
                args: [
                    "#08060f"
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/MantraverseScene.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.4
            }, void 0, false, {
                fileName: "[project]/src/components/MantraverseScene.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("pointLight", {
                position: [
                    6,
                    6,
                    6
                ],
                intensity: 2,
                color: "#22d3ee"
            }, void 0, false, {
                fileName: "[project]/src/components/MantraverseScene.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("pointLight", {
                position: [
                    -6,
                    -4,
                    -4
                ],
                intensity: 2,
                color: "#e879f9"
            }, void 0, false, {
                fileName: "[project]/src/components/MantraverseScene.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["Suspense"], {
                fallback: null,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$drei__$5b$external$5d$__$2840$react$2d$three$2f$drei$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$29$__["Stars"], {
                        radius: 60,
                        depth: 40,
                        count: 3500,
                        factor: 4,
                        fade: true,
                        speed: 1.2
                    }, void 0, false, {
                        fileName: "[project]/src/components/MantraverseScene.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Knot, {}, void 0, false, {
                        fileName: "[project]/src/components/MantraverseScene.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Orb, {
                        position: [
                            -3.2,
                            1.6,
                            -1
                        ],
                        color: "#22d3ee"
                    }, void 0, false, {
                        fileName: "[project]/src/components/MantraverseScene.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Orb, {
                        position: [
                            3,
                            -1.4,
                            -1
                        ],
                        color: "#e879f9",
                        scale: 0.8
                    }, void 0, false, {
                        fileName: "[project]/src/components/MantraverseScene.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Orb, {
                        position: [
                            2.4,
                            2.4,
                            -2
                        ],
                        color: "#a78bfa",
                        scale: 0.5
                    }, void 0, false, {
                        fileName: "[project]/src/components/MantraverseScene.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Orb, {
                        position: [
                            -2.4,
                            -2,
                            -2
                        ],
                        color: "#34d399",
                        scale: 0.5
                    }, void 0, false, {
                        fileName: "[project]/src/components/MantraverseScene.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/MantraverseScene.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$drei__$5b$external$5d$__$2840$react$2d$three$2f$drei$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$29$__["OrbitControls"], {
                enableZoom: false,
                enablePan: false,
                autoRotate: true,
                autoRotateSpeed: 0.6
            }, void 0, false, {
                fileName: "[project]/src/components/MantraverseScene.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/MantraverseScene.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/MantraverseScene.tsx [ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/MantraverseScene.tsx [ssr] (ecmascript)"));
}),
"[externals]/@react-three/fiber [external] (@react-three/fiber, cjs, [project]/node_modules/@react-three/fiber)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@react-three/fiber-1ddc862b4060bf54", () => require("@react-three/fiber-1ddc862b4060bf54"));

module.exports = mod;
}),
"[externals]/@react-three/drei [external] (@react-three/drei, cjs, [project]/node_modules/@react-three/drei)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@react-three/drei-55417cbbf7f59941", () => require("@react-three/drei-55417cbbf7f59941"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0wgvksl._.js.map