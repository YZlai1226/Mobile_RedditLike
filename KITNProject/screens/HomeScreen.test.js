// import { useEffect } from "react/cjs/react.production.min"

test('HomeScreen test', async () => {
    const data = await getLatest();
    expect(data).toBeDefined()
}
)