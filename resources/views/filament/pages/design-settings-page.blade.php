<x-filament-panels::page>
    <form wire:submit="save">
        {{ $this->form }}

        <div class="mt-6 flex items-center gap-3">
            <x-filament::button type="submit">
                Speichern
            </x-filament::button>

            <x-filament::button
                type="button"
                color="gray"
                wire:click="resetToDefaults"
                wire:confirm="Alle Design-Einstellungen wirklich auf die Standardwerte zurücksetzen?"
            >
                Auf Standard zurücksetzen
            </x-filament::button>
        </div>
    </form>
</x-filament-panels::page>
