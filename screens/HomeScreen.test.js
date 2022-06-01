import getPosts from "./HomeScreen"

test('HomeScreen test', async () => {
    const data = await getPosts();
    expect(data).toBeDefined()
}
)