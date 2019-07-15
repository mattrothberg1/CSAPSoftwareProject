class AppComponent {
    private toggleText: string = "Hide";
    private show: boolean = true;

    public onToggle(): void {
        this.show = !this.show;
        this.toggleText = this.show ? "Hidе" : "Show";
    }
}