async function delay(timeout: number): Promise<() => {}> {
    return new Promise(resolve => {
        setTimeout(resolve, timeout)
    })
}

export { delay }